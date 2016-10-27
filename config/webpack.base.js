var path = require('path')

module.exports = {
  entry: {
    dragable: './src/main.js'
  },
  output: {
    // library: 'dragable',
    // libraryTarget: 'umd',
    filename: '[name].js',
    publicPath: './',
    path: path.resolve(__dirname, '../dist/')
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
