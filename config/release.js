var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base')

var webpackConfig = merge(baseConfig, {
  entry: {
    dragable: './src/dragable.js'
  },
  output: {
    library: 'dragable',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../release/')
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})

webpack(webpackConfig, function (err, stats) {
  if (err) return console.log(err)
  console.log('build dragable.js!')
})
