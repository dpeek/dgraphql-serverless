const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', './src/handler.js'],
  target: 'node',
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.json/,
        loaders: ['json-loader']
      },
      {
        test: /\.graphql/,
        loaders: ['string-loader']
      }
    ]
  }
}
