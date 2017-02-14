const express     = require('express');
const jwt         = require('jsonwebtoken');
const userRouter  = require('./user');
const authRouter  = require('./auth');
const cvRouter    = require('./cv');
const router      = express.Router();

function checkTokenMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: 'You are not authorized to perform this action'
    });
  } else {
    jwt.verify(
      req.headers.authorization.split('Bearer ')[1],
      'CvsPrivateKey',
      (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(440).json({ error: 'Session expired' });
          } else {
            return res.status(500).json({ error: err });
          }
        }
        if (!decoded.user &&
            (decoded.action !== 'register' ||
             req.baseUrl !== '/api/user' ||
             req.method !== 'POST')) {
          return res.status(400).json({ error: 'Invalid token provided' });
        }
        next();
      }
    );
  }
}

router.use('/auth', authRouter);
router.use('/user', checkTokenMiddleware, userRouter);
router.use('/cv', checkTokenMiddleware, cvRouter);

module.exports = router;