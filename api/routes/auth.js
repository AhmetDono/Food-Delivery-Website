const express = require('express');
const { register, login, logout, forgotPassword, resetPassword } = require('../controllers/auth');

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.post('/forgotPassword',forgotPassword); // todo
router.post('/reset/:token',resetPassword); // todo

module.exports = router