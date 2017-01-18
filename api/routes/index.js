const express = require('express');
const router  = express.Router();
const db      = require('../models');
const multer  = require('multer');

const upload = multer();

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

router.get('/user', (req, res) => {
  db
    .User
    .findAll()
    .then((users) => {
      res.json({ data: users });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/user/:id', (req, res) => {
  db
    .User
    .findById(req.params.id)
    .then((user) => {
      res.json({ data: user });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post('/user', upload.array(), (req, res, next) => {
  if (req.body.email) {
    if (!validateEmail(req.body.email)) {
      res.status(400).json({
        error: 'Email must be a valid email address'
      });
      return next();
    }
  } else {
    res.status(400).json({ error: 'Email is required but missing' });
    return next();
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      res.status(400).json({
        error: 'Password should contain at least 6 characters'
      });
      return next();
    }
  } else {
    res.status(400).json({ error: 'Password is required but missing' });
    return next();
  }
  db
    .User
    .create(req.body)
    .then((user) => {
      res.json({ data: user });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.put('/user/:id', (req, res) => {
  res.json({ message: 'Not implemented yet' });
});

router.delete('/user/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  db
    .User
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.json({ message: '' });
    });
});

module.exports = router;