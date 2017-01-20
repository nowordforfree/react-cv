const express = require('express');
const jwt     = require('jsonwebtoken');
const db      = require('../models');

const router  = express.Router();

router.post('/login', (req, res, next) => {
  if (!req.body.email) {
    res.status(400).json({
      error: 'Email is not provided'
    });
    return next();
  }
  if (!req.body.password) {
    res.status(400).json({
      error: 'Password is not provided'
    });
    return next();
  }
  db
    .User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if (!user) {
        res.status(400).json({
          error: 'User with such email is not found'
        });
        return next();
      }
      if (user.comparePassword(req.body.password)) {
        jwt.sign({
          user: user.get()
        }, 'CvsPrivateKey', {
          expiresIn: '30m'
        }, (err, token) => {
          if (err) {
            res.status(500).json({
              error: err
            });
          } else {
            res.json({
              data: {
                token: token,
                user: user
              }
            });
          }
        });
      } else {
        res.status(400).json({
          error: 'Password does not match'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post('/logout', (req, res, next) => {
  req.session = null;
  res.json({ data: 'Bye' });
});

module.exports = router;