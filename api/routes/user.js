const express = require('express');
const db = require('../models');

const router = express.Router();

function validateEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
}

router.get('/', (req, res) => {
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
// eslint-disable-next-line consistent-return
router.get('/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      error: 'User ID is required'
    });
  }
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
// eslint-disable-next-line consistent-return
router.post('/', (req, res, next) => {
  if (req.body.email) {
    if (!validateEmail(req.body.email)) {
      res.status(400).json({
        error: 'Email must be a valid email address'
      });
      return next();
    }
  } else {
    res.status(400).json({
      error: 'Email is required but missing'
    });
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
    res.status(400).json({
      error: 'Password is required but missing'
    });
    return next();
  }
  db
    .User
    .create(req.body)
    .then((user) => {
      res.json({ data: user });
    })
    .catch(db.Sequelize.ValidationError, (err) => {
      res
        .status(400)
        .json({
          error: err.errors.reduce((text, obj) => {
            const result = `text${obj.message}\n`;
            return result;
          }, '')
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
// eslint-disable-next-line consistent-return
router.put('/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      error: 'User ID is required'
    });
  }
  db
    .User
    .findById(req.params.id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: `User with ID ${req.params.id} was not found`
        });
      }
      user
        .update(req.body)
        .then((updatedUser) => {
          res.json({ data: updatedUser });
        })
        .catch((err) => {
          res.json({ error: err });
        });
    });
});

router.delete('/:id', (req, res) => {
  db
    .User
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then((arg) => {
      res.json({ data: arg });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = router;
