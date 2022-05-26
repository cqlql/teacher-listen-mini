'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _wxCanvas = require('./wx-canvas');

var _wxCanvas2 = _interopRequireDefault(_wxCanvas);

var _echarts = require('./echarts');

var echarts = _interopRequireWildcard(_echarts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = void 0;

function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  var len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i]);
    var num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

Component({
  properties: {
    canvasId: {
      type: String,
      value: 'ec-canvas'
    },

    ec: {
      type: Object
    },

    forceUseOldCanvas: {
      type: Boolean,
      value: false
    }
  },

  data: {
    isUseNewCanvas: false
  },

  ready: function ready() {
    // Disable prograssive because drawImage doesn't support DOM as parameter
    // See https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.drawImage.html
    echarts.registerPreprocessor(function (option) {
      if (option && option.series) {
        if (option.series.length > 0) {
          option.series.forEach(function (series) {
            series.progressive = 0;
          });
        } else if (_typeof(option.series) === 'object') {
          option.series.progressive = 0;
        }
      }
    });

    if (!this.data.ec) {
      console.warn('组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' + 'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>');
      return;
    }

    if (!this.data.ec.lazyLoad) {
      this.init();
    }
  },

  methods: {
    init: function init(callback) {
      var version = wx.getSystemInfoSync().SDKVersion;

      var canUseNewCanvas = compareVersion(version, '2.9.0') >= 0;
      var forceUseOldCanvas = this.data.forceUseOldCanvas;
      var isUseNewCanvas = canUseNewCanvas && !forceUseOldCanvas;
      this.setData({ isUseNewCanvas: isUseNewCanvas });

      if (forceUseOldCanvas && canUseNewCanvas) {
        console.warn('开发者强制使用旧canvas,建议关闭');
      }

      if (isUseNewCanvas) {
        // console.log('微信基础库版本大于2.9.0，开始使用<canvas type="2d"/>');
        // 2.9.0 可以使用 <canvas type="2d"></canvas>
        this.initByNewWay(callback);
      } else {
        var isValid = compareVersion(version, '1.9.91') >= 0;
        if (!isValid) {
          console.error('微信基础库版本过低，需大于等于 1.9.91。' + '参见：https://github.com/ecomfe/echarts-for-weixin' + '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82');
          return;
        } else {
          console.warn('建议将微信基础库调整大于等于2.9.0版本。升级后绘图将有更好性能');
          this.initByOldWay(callback);
        }
      }
    },

    initByOldWay: function initByOldWay(callback) {
      var _this = this;

      // 1.9.91 <= version < 2.9.0：原来的方式初始化
      ctx = wx.createCanvasContext(this.data.canvasId, this);
      var canvas = new _wxCanvas2.default(ctx, this.data.canvasId, false);

      echarts.setCanvasCreator(function () {
        return canvas;
      });
      // const canvasDpr = wx.getSystemInfoSync().pixelRatio // 微信旧的canvas不能传入dpr
      var canvasDpr = 1;
      var query = wx.createSelectorQuery().in(this);
      query.select('.ec-canvas').boundingClientRect(function (res) {
        if (typeof callback === 'function') {
          _this.chart = callback(canvas, res.width, res.height, canvasDpr);
        } else if (_this.data.ec && typeof _this.data.ec.onInit === 'function') {
          _this.chart = _this.data.ec.onInit(canvas, res.width, res.height, canvasDpr);
        } else {
          _this.triggerEvent('init', {
            canvas: canvas,
            width: res.width,
            height: res.height,
            canvasDpr: canvasDpr // 增加了dpr，可方便外面echarts.init
          });
        }
      }).exec();
    },
    initByNewWay: function initByNewWay(callback) {
      var _this2 = this;

      // version >= 2.9.0：使用新的方式初始化
      var query = wx.createSelectorQuery().in(this);
      query.select('.ec-canvas').fields({ node: true, size: true }).exec(function (res) {
        var canvasNode = res[0].node;
        _this2.canvasNode = canvasNode;

        var canvasDpr = wx.getSystemInfoSync().pixelRatio;
        var canvasWidth = res[0].width;
        var canvasHeight = res[0].height;

        var ctx = canvasNode.getContext('2d');

        var canvas = new _wxCanvas2.default(ctx, _this2.data.canvasId, true, canvasNode);
        echarts.setCanvasCreator(function () {
          return canvas;
        });

        if (typeof callback === 'function') {
          _this2.chart = callback(canvas, canvasWidth, canvasHeight, canvasDpr);
        } else if (_this2.data.ec && typeof _this2.data.ec.onInit === 'function') {
          _this2.chart = _this2.data.ec.onInit(canvas, canvasWidth, canvasHeight, canvasDpr);
        } else {
          _this2.triggerEvent('init', {
            canvas: canvas,
            width: canvasWidth,
            height: canvasHeight,
            dpr: canvasDpr
          });
        }
      });
    },
    canvasToTempFilePath: function canvasToTempFilePath(opt) {
      var _this3 = this;

      if (this.data.isUseNewCanvas) {
        // 新版
        var query = wx.createSelectorQuery().in(this);
        query.select('.ec-canvas').fields({ node: true, size: true }).exec(function (res) {
          var canvasNode = res[0].node;
          opt.canvas = canvasNode;
          wx.canvasToTempFilePath(opt);
        });
      } else {
        // 旧的
        if (!opt.canvasId) {
          opt.canvasId = this.data.canvasId;
        }
        ctx.draw(true, function () {
          wx.canvasToTempFilePath(opt, _this3);
        });
      }
    },
    touchStart: function touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'start');
      }
    },
    touchMove: function touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'change');
      }
    },
    touchEnd: function touchEnd(e) {
      if (this.chart) {
        var touch = e.changedTouches ? e.changedTouches[0] : {};
        var handler = this.chart.getZr().handler;
        handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'end');
      }
    }
  }
});

function wrapTouch(event) {
  for (var i = 0; i < event.touches.length; ++i) {
    var touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}