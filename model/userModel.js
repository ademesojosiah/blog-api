const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



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


userModel.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userModel.methods.CreateJwt = function(){
   return jwt.sign({user_id: this._id, email: this.email, fullname:`${this.first_name} ${this.last_name}`},process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
}

userModel.methods.isPassword = async function(newPassword){
    const checkPasssword = await bcrypt.compare(newPassword,this.password)
    return checkPasssword
}

module.exports = mongoose.model('User',userModel)