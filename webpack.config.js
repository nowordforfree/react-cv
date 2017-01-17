const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
	entry: {
		app: [ './public/js/index.js' ]
	},
	output: {
		path: path.join(__dirname, 'public/js'),
		publicPath: '/public/js',
		filename: 'bundle.js'
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
			loader: 'file?name=../fonts/[name].[ext]'
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
  ],
  devServer: {
    contentBase: ['./public'],
    historyApiFallback: true,
		host: config.app.host,
		port: config.app.port,
		publicPath: '/',
    colors: true,
		progress: true,
		hot: true,
		inline: true,
		lazy: false
  }
}