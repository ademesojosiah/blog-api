const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('../logging/logger')

const connectDb = ()=>{
     mongoose.connect(process.env.MONGO_URI)

     mongoose.connection.on('connected',()=>{
        logger.info('connected to mongoDB succesfully');
     })

     mongoose.connection.on('error', (err)=>{
        logger.err('an error occured while connecting to the database');
        logger.err(err);
     })
}

module.exports = { connectDb }