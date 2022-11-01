const mongoose = require('mongoose')

const connectDb = ()=>{
     mongoose.connect('mongodb://127.0.0.1:27017/blog-project')

     mongoose.connection.on('connected',()=>{
        console.log('connected to mongoDB succesfully');
     })

     mongoose.connection.on('error', (err)=>{
        console.log('an error occured while connecting to the database');
        console.log(err);
     })
}

module.exports = { connectDb }