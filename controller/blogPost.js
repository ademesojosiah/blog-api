   const { blogPostModel } = require('../model')
   
   const createBlog = async (req,res,next)=>{
        try {
            const {user:{fullname},body} = req
            body.author = fullname
            console.log(body);
            const user = await blogPostModel.create({...body})
            res.status(200).json({user})
        } catch (error) {
            next(error)
        }
    }


    const getBlogs = async(req,res)=>{
        try {
            const user = await blogPostModel.find()
            res.status(200).json({user})
        } catch (error) {
            next(error)
        }
    }

module.exports = { createBlog , getBlogs}