const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const utils = require('./utils')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeJsPlugin = require('optimize-js-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')
const mediaPacker = require('css-mqpacker')

const config = require('../config')
const baseConfig = require('./webpack.lib.base.conf')
// const baseConfig = require('./webpack.base.conf')

const isSelfDebug = false

const version = require('../package.json').version

baseConfig.entry = {
  // 'mb-ui': ['./src/packages/index.ts']
}
// console.log(baseConfig)
function getEntry(src) {
  // console.log(src)
  return fs.readdirSync(src).filter(file => {
    return fs.statSync(path.join(src, file)).isDirectory()
  })
}
const libConfig = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader',
              fallback: 'vue-style-loader'
            })
          },
          postcss: [
            autoprefixer({
              browsers: [
                'last 3 versions',
                'not IE < 9',
                "iOS >= 7",
                "Android >= 4.1",
              ]
            }),
            mediaPacker()
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'vue-style-loader'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader',
          fallback: 'vue-style-loader'
        })
      }
    ]
  },
  externals:  {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
      var: 'Vue'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        join_vars: true,
        if_return: true
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV
    }),
    new webpack.BannerPlugin({
      banner: `/*!\n* mb-ui v${version}\n* author: linjiajian999\n* MIT License\n*/\n`,
      raw: true,
      entryOnly: true
    }),
    new OptimizeCssAssetsPlugin({
      canPrint: false
    })
  ]
}
const componentsPath = 'src/packages'
const components = getEntry(path.resolve(__dirname, '../', componentsPath))

const componentsEntry = { entry: {}}
components.forEach((component) => {
  baseConfig.entry[component] = [`./${path.join(componentsPath, component)}`]
})
// console.log(componentsEntry.entry)
const componentsWebpackConfig = merge(baseConfig, {
  // entry: componentsEntry.entry,
  output: {
    path: config.build.assetsRoot,
    filename: 'components/[name]/index.js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  module: libConfig.module,
  externals:libConfig.externals,
  plugins: [
    ...libConfig.plugins,
    new ExtractTextPlugin({
      filename: 'components/[name]/index.css'
    })
  ]
})
// const indexWebpackConfig = merge(baseConfig, {
//   // entry: {
//   //   'mb-ui': ['./src/packages/index.ts']
//   // },
//   output: {
//     path: config.build.assetsRoot,
//     filename: '[name].js',
//     library: 'MbUI',
//     libraryTarget: 'umd'
//   },
//   module: libConfig.module,
//   externals:libConfig.externals,
//   plugins: [
//     ...libConfig.plugins,
//     new ExtractTextPlugin({
//       filename: '[name].css'
//     })
//   ]
// })
// const libConfigs = [componentsWebpackConfig, indexWebpackConfig]
// const libConfigs = [componentsWebpackConfig]
// console.log(componentsWebpackConfig.module.rules)
module.exports = componentsWebpackConfig