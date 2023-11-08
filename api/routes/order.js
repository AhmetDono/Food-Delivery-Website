const express = require('express');
const { createOrder,
    deleteOrder,
    updateOrder,
    getUserOrder,
    getAlluserOrder,
    getMonthlyOrderCount,
    getMonthlyTotalIncome } = require('../controllers/order');

const router = express.Router();

router.post('/createOrder',createOrder);
router.delete('/deleteOrder/:id',deleteOrder);
router.put('/updateOrder/:id',updateOrder);
router.get('/getUserOrder/:id',getUserOrder);
router.get('/getAllUserOrder',getAlluserOrder);
router.get('/getMonthlyOrderCount',getMonthlyOrderCount);
router.get('/getMonthlyTotalIncome',getMonthlyTotalIncome);

module.exports = router