const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config');
const webpackConfig = require('./webpack.config');
const runApi = require('./api');

const DEFAULT_PORT = process.env.PORT || config.app.port || 8080;
let compiler;

function setupCompiler(host, port, protocol) {
  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  compiler = webpack(webpackConfig);

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', () => {
    console.log('Compiling...');
  });

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', (stats) => {
    console.log(`The app is running at: ${protocol}://${host}:${port}`);
  });
}

function runDevServer(host, port, protocol) {
  var devServer = new WebpackDevServer(compiler, {
    // Enable gzip compression of generated files.
    compress: true,
    contentBase: ['./public'],
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    historyApiFallback: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: '/',
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/
    },
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === "https",
    host: host,
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      progress: true,
      timings: true,
      chunks: false,
      chunkModules: false
    }
  });

  // Launch WebpackDevServer.
  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log('Starting the development server...');
  });
}

function run(port) {
  var protocol = (process.env.HTTPS === 'true' ||
                  config.app.https === true) ? 'https' : 'http';
  var host = process.env.HOST || config.app.host || 'localhost';
  runApi();
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

run(DEFAULT_PORT);
