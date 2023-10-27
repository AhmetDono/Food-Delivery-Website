const express = require('express');
const { createOrder,
    deleteOrder,
    updateOrder,
    getUserOrder,
    getAlluserOrder,
    getMonthlyIncome } = require('../controllers/order');

const router = express.Router();

router.post('/createOrder',createOrder);
router.delete('/deleteOrder/:id',deleteOrder);
router.put('/updateOrder/:id',updateOrder);
router.get('/getUserOrder/:id',getUserOrder);
router.get('/getAllUserOrder',getAlluserOrder);
router.get('/getMonthlyIncome',getMonthlyIncome);

module.exports = router