const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const prodConfig = require('./webpack.lib.conf.js');

const devConfig = merge(prodConfig, {
  output: {
    filename: 'components/[name]/index.debug.js'
  },
  devtool: 'source-map'
});

devConfig.plugins = [
  new OptimizeJsPlugin(),
  new ExtractTextPlugin('components/[name]/index.css')
];

module.exports =  devConfig;
