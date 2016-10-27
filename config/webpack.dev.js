var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base')

Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./config/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
