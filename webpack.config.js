const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const config = require('./config');

module.exports = {
  entry: [
    path.join(__dirname, 'public/js', 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public',
    filename: 'js/bundle.js'
  },
  devtool: '#source-map',
  module: {
    loaders: [{
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=/fonts/[name].[ext]'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch'
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(`http://${config.api.host}:${config.api.port}/api`),
      'process.env': {
        'NODE_ENV': (process.env && JSON.stringify(process.env.NODE_ENV)) || JSON.stringify('development')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]
};
