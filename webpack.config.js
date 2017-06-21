module.exports = {
  entry: ['babel-polyfill', './handler.js'],
  target: 'node',
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
