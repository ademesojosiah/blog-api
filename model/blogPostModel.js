const mongoose = require('mongoose')


const blogPostSchema = new mongoose.Schema({
    title:{type:String,
    required:[ true, "title is required"],
    unique:[true,' this title has already taken']
    },
    description:String,
    author:{type:mongoose.Types.ObjectId,
        ref:'User'
    },
    writtenBy:{
        type:String
    },
    state:{
        type:String,
        enum:["Draft","Published"],
        default: 'Draft'
    },
    read_count:Number,
    reading_time: String,
    tags: String,
    body:{
        type:String, 
        required:[ true,"Please the body is required"]
    }

 }, { timestamps: true})



module.exports = mongoose.model('BlogPost',blogPostSchema)

