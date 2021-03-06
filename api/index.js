const express = require('express');
const routes = require('./routes');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const config = require('../config');

const upload = multer();

const HOST = config.api.host || 'localhost';
const PORT = config.api.port || '8070';

module.exports = () => {
  const app = express();
  // hack ?
  app.set('trust proxy', 1);
  // Helmet can help protect app from some well-known web
  // vulnerabilities by setting HTTP headers appropriately
  app.use(helmet());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());
  // Use cookie-parser
  app.use(cookieParser());
  // enable CORS
  app.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });
    next();
  });
  // "multer" package used for handling multipart/form-data requests
  app.post('/api', upload.array());

  app.use('/api', routes);

  app.get('/', (req, res) => {
    res.json({ message: 'use /api instead of /' });
  });

  app.listen(config.api.port, config.api.hostname, () => {
    console.log(`API server is running on http://${HOST}:${PORT}`);
  });
};
