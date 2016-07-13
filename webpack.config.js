var path = require('path');

module.exports = {
  entry: './index.js',
	output: {
		path: path.join(__dirname, 'lib'),
		filename: 'tripopupper.js',
		library: 'tripopupper',
		libraryTarget: 'umd'
  },
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
