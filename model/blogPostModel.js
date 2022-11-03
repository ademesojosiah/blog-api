const mongoose = require('mongoose')


const blogPostSchema = new mongoose.Schema({
    title:{type:String,
    required:[ true, "title is required"],
    unique:[true,' this title has already taken']
    },
    description:String,
    author:{type:String,
        ref:'User'
    },
    state:{
        type:String,
        enum:["draft","Published"],
        default: 'draft'
    },
    read_count:Number,
    reading_time: Number,
    tags: String,
    body:{
        type:String, 
        required:[ true,"Please the body is required"]
    }

 }, { timestamps: true})


module.exports = mongoose.model('BlogPost',blogPostSchema)

