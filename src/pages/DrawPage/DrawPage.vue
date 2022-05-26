<!-- canvas 画笔 -->
<script lang="ts" setup>
import type { Canvas, CanvasContext } from '@tarojs/taro'
import Taro, {
  nextTick,
  useReady,
  createSelectorQuery,
  getWindowInfo,
  canvasToTempFilePath,
} from '@tarojs/taro'
import { ref } from 'vue'

import usePage from '@/hooks/usePage'
import useFileUpload from '@/hooks/useFileUpload'
import useToast from '@/hooks/useToast'

let { toast, toastFail, toastLoading, toastClose } = useToast()

const { eventChannel } = usePage()
const { fileUpload } = useFileUpload()

let startX = 0
let startY = 0
let currentX = 0
let currentY = 0
let isErasing = ref(false)
const lineWidth = 2
const lineColor = '#002766'

let canvas: Canvas
let ctx: CanvasContext
let dpr: number

const canvasStyle = ref({
  width: '100px',
  height: '100px',
})

useReady(() => {
  nextTick(() => {
    createSelectorQuery()
      .select('#canvas')
      .fields(
        {
          node: true,
          size: true,
        },
        function (res) {
          const windowInfo = getWindowInfo()

          const width = windowInfo.windowWidth
          const height = windowInfo.windowHeight
          dpr = wx.getSystemInfoSync().pixelRatio
          canvas = res.node as Canvas
          ctx = canvas.getContext('2d') as CanvasContext

          canvas.width = width * dpr
          canvas.height = height * dpr

          canvasStyle.value = {
            width: width + 'px',
            height: height + 'px',
          }

          setBrush()
        },
      )
      .exec()
  })
})

function drawEraser(x, y) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, 30, 0, Math.PI * 2, false)
  ctx.clip()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.closePath()
  ctx.restore()
}

// 设置画笔颜色粗细
function setBrush() {
  ctx.lineWidth = lineWidth * dpr
  ctx.strokeStyle = lineColor
}

function touchstart(e) {
  let touch = e.changedTouches[0]
  startX = touch.x * dpr
  startY = touch.y * dpr
  ctx.beginPath()
  ctx.moveTo(startX, startY)
}
function touchmove(e) {
  let touch = e.changedTouches[0]
  currentX = touch.x * dpr
  currentY = touch.y * dpr

  if (isErasing.value) {
    drawEraser(currentX, currentY)
  } else {
    ctx.lineTo(currentX, currentY)
    ctx.stroke()
  }
}
function touchend() {}

function onSave() {
  // if (process.env.NODE_ENV !== 'production') {
  //   eventChannel.emit('confirm', {
  //     id: '1',
  //     url: 'https://img13.360buyimg.com/pop/s590x470_jfs/t1/149300/24/24635/32895/62426077Ef3aad09b/783a62f49bd90b04.jpg.webp',
  //   })
  //   return
  // }
  canvasToTempFilePath({
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    destWidth: canvas.width,
    destHeight: canvas.height,
    // canvasId: 'canvas',
    canvas: canvas as any,
    success(res) {
      toastLoading('上传开始')
      fileUpload(res.tempFilePath, (res) => {
        toast.msg = `上传文件：${res.progress * 0.99}%`
      })
        .then((imgInfo) => {
          eventChannel.emit('confirm', imgInfo)
        })
        .catch((e) => {
          toastFail('上传失败 ' + e)
        })
        .finally(() => {
          toastClose()
        })
    },
  })
}

function onClear() {
  canvas.width = canvas.width
  canvas.height = canvas.height
  setBrush()
}

function onEraser() {
  isErasing.value = !isErasing.value
}

function onBack() {
  Taro.navigateBack()
}
</script>

<template>
  <div class="DrawPopup">
    <canvas
      disable-scroll="false"
      type="2d"
      id="canvas"
      :style="canvasStyle"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    ></canvas>
    <nut-button icon="left" @click="onBack" class="back-btn"></nut-button>
    <nut-button type="primary" @click="onSave" class="save-btn">保存</nut-button>
    <button @click="onEraser" class="eraser-btn" :class="{ active: isErasing }">
      <nut-icon font-class-name="iconfont" class-prefix="icon" name="eraser"></nut-icon>
    </button>
    <button @click="onClear" class="clear-btn">
      <nut-icon name="del"></nut-icon>
    </button>
    <nut-toast v-bind="toast" v-model:visible="toast.show" />
  </div>
</template>

<style lang="scss">
.DrawPopup {
  // background-color: #ddd;
  overflow: hidden;
  position: relative;

  .back-btn {
    border: none;
    position: absolute;
    left: 0;
    top: calc(20px + constant(safe-area-inset-bottom));
    top: calc(20px + env(safe-area-inset-bottom));
  }

  .save-btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: calc(20px + constant(safe-area-inset-bottom));
    top: calc(20px + env(safe-area-inset-bottom));
  }

  .eraser-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(-50%, 50%);
    background: #0ea5e9;
    width: 120px;
    height: 120px;
    border-radius: 120px;
    color: #fff;
    .nut-icon {
      position: absolute;
      right: 25px;
      top: 25px;
      font-size: 25px;
    }
    &.active {
      background: #7dd3fc;
    }
  }

  .clear-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
    background: #f97316;
    width: 120px;
    height: 120px;
    border-radius: 120px;
    color: #fff;

    .nut-icon {
      position: absolute;
      left: 25px;
      top: 25px;
      font-size: 25px;
    }
  }
}
</style>
