const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = ()=>{
     mongoose.connect(process.env.MONGO_URI)

     mongoose.connection.on('connected',()=>{
        console.log('connected to mongoDB succesfully');
     })

     mongoose.connection.on('error', (err)=>{
        console.log('an error occured while connecting to the database');
        console.log(err);
     })
}

module.exports = { connectDb }