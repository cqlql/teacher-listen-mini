const path = require('path')

const isBuild = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

// ts 检查
// 目前只用来验证 ts、tsx
// 无法验证 <script setup lang="ts">，参考 https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/pull/678
// 临时解决：vscode 执行 volar: verify all script 命令
function webpackforkTsChecker(chain) {
  chain.plugin('fork-ts-checker').use(require('fork-ts-checker-webpack-plugin'), [
    {
      typescript: {
        // <script setup lang="ts"> 语法会有意想不到的错误，先禁用
        // extensions: {
        //   vue: {
        //     enabled: true,
        //     compiler: require.resolve('vue/compiler-sfc'),
        //   },
        // },
        diagnosticOptions: {
          semantic: true,
          // https://github.com/TypeStrong/ts-loader#happypackmode
          syntactic: true,
        },
      },
    },
  ])
}

const config = {
  projectName: 'lmm-mini-app',
  date: '2021-10-15',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html',
    [
      // ec-canvas 视为原生组件
      '@tarojs/plugin-framework-vue3',
      {
        mini: {
          compilerOptions: {
            isCustomElement: (tag) => tag.includes('ec-canvas'),
            // whitespace: 'preserve',
          },
        },
      },
    ],
  ],
  defineConstants: {},
  copy: {
    // 原生组件文件复制到 dist
    patterns: [
      {
        from: 'components-weapp',
        to: `dist/${isBuild ? 'prod' : 'dev'}/packageECharts/components-weapp`,
      },
    ],

    options: {},
  },
  framework: 'vue3',
  alias: {
    '@': resolve('src'),
  },
  mini: {
    miniCssExtractPluginOption: {
      //忽略css文件引入顺序
      ignoreOrder: true,
    },

    compile: {
      exclude: [
        // echarts 不编译
        (modulePath) => modulePath.indexOf('ec-canvas/echarts') >= 0,
        // path.resolve(__dirname, '..', 'src/packageA/components-weapp/ec-canvas/echarts.js'),
      ],
    },

    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    // 自定义 Webpack 配置
    webpackChain(chain) {
      // ts 检查
      webpackforkTsChecker(chain)

      // echarts 的调用方式，https://webpack.docschina.org/configuration/externals/
      chain.merge({
        externals: {
          echarts: 'commonjs ../../components-weapp/ec-canvas/echarts',
        },
      })
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    // 自定义 Webpack 配置
    webpackChain(chain) {
      // ts 检查
      webpackforkTsChecker(chain)
    },
  },
  sass: {
    resource: resolve('src/styles/variables.scss'),
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
