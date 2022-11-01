const mongoose = require('mongoose')



const userModel = new mongoose.Schema({
    first_name :{
        type:String,
        required :[ true, 'Please provide your Firstname']},
    last_name :{
        type:String, 
        required :[ true, 'Please provide your Lastname']},
    email :{type:String,
        required :[ true, 'Please provide your email'], 
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: [true, 'email already exists']},
    password :{
        type:String,
        required :[ true, 'Please provide your password']}
})


module.exports = mongoose.model('User',userModel)