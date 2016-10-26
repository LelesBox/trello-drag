var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/drag.js',
  output: {
    library: 'drag',
    libraryTarget: 'umd',
    filename: 'drag.js',
    path: path.resolve(__dirname, './dist/')
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devtool: '#source-map'
}
