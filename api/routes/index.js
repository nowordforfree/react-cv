const express     = require('express');
const userRouter  = require('./user');
const authRouter  = require('./auth');
const cvRouter    = require('./cv');
const router      = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/cv', cvRouter);

module.exports = router;