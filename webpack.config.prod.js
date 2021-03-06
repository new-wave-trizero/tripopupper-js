var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'lib'),
		filename: 'tripopupper.js',
		library: 'tripopupper',
		libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
