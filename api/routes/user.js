const express = require('express');
const {getUser,getAlluser, deleteUser, updateUser, monthlyUserInfo} = require('../controllers/user');

const router = express.Router();

router.delete('/deleteUser/:id',deleteUser);
router.put('/updateUser/:id',updateUser);
router.get('/getUser/:id',getUser);
router.get('/getAllUser',getAlluser);
router.get('/getMonthlyUserInfo',monthlyUserInfo);

module.exports = router