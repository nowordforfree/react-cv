const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const config = require('../config');

const HOST = config.api.hostname || 'localhost';
const PORT = config.api.port || '8070'; 

module.exports = () => {
  const app = express();
  // Also "multer" package is used in POST /user route
  // for handling multipart/form-data requests
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))
  // parse application/json
  app.use(bodyParser.json())
  app.use('/api', routes);

  app.get('/', (req, res) => {
    res.json({ message: 'use /api instead of /' });
  });

  app.listen(config.api.port, config.api.hostname, () => {
    console.log(`API server is running on http://${HOST}:${PORT}`);
  });
}
