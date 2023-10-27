const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
const user = require('./routes/user');
const food = require('./routes/food');
const order = require('./routes/order');

const app = express();
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Db connection is successfull"))
.catch((err)=>{console.log(err)});

app.use(express.json());
app.use(cors());
app.use('/api/auth',auth);
app.use('/api/user',user);
app.use('/api/food',food);
app.use('/api/order',order);




app.listen(process.env.PORT || 5000,()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
})