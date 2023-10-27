const express = require('express');
const {getUser,getAlluser, deleteUser, updateUser} = require('../controllers/user');

const router = express.Router();

router.delete('/deleteUser/:id',deleteUser);
router.delete('/updateUser/:id',updateUser);
router.get('/getUser/:id',getUser);
router.get('/getAllUser',getAlluser);

module.exports = router