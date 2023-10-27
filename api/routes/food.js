const express = require('express');
const { createFood  ,
    deleteFood,
    updateFood,
    getFood,
    getAllFood} = require('../controllers/food');

const router = express.Router();

router.post('/createFood',createFood);
router.delete('/deleteFood/:id',deleteFood);
router.put('/updateFood/:id',updateFood);
router.get('/getFood/:id',getFood);
router.get('/getAllFood',getAllFood);

module.exports = router