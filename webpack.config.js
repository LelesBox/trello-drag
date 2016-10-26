var path = require('path')

module.exports = {
  entry: './src/dragable.js',
  output: {
    library: 'dragable',
    libraryTarget: 'umd',
    filename: 'dragable.js',
    path: path.resolve(__dirname, './dist/')
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devtool: '#source-map'
}
