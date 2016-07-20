var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './index.js',
  ],
	output: {
		path: path.join(__dirname, 'lib'),
		filename: 'tripopupper.js',
		library: 'tripopupper',
		libraryTarget: 'umd',
    publicPath: '/lib/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|gif|jpg)$/, loader: "url-loader" }
    ]
  }
};
