var path = require('path');

var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: {
    main: path.join(__dirname, 'src')
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel?blacklist[]=react', exclude: /node_modules/},
      {test: /\.jsx$/, loaders: ['imports?React=react', 'react-hot', 'babel']},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.less$/, loader: 'style!css!less'}
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/_assets/'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  }
};
