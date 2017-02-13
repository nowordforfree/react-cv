const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const config = require('./config');

module.exports = {
	entry: [
		'react-hot-loader/patch',
		`webpack-dev-server/client?http://${config.app.host}:${config.app.port}`,
		'./public/js/index.js'
	],
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
		new webpack.NamedModulesPlugin(),
    new WebpackNotifierPlugin(),
		new webpack.DefinePlugin({
			API_URL: JSON.stringify(`http://${config.api.host}:${config.api.port}/api`),
			'process.env': {
				'NODE_ENV': (process.env && JSON.stringify(process.env.NODE_ENV)) || JSON.stringify('development')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin()
  ]
}