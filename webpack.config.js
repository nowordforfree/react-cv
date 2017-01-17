const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
	entry: {
		app: [ './public/js/index.js' ]
	},
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/public',
		filename: 'js/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.less$/,
			loader: 'style!css!less'
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			loader: 'file?name=/fonts/[name].[ext]'
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		}]
	},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
  ]
}