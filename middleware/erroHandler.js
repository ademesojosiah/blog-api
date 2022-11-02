const errorhandler = (err,req,res,next) =>{
    const customError = {
        statusCode : err.statusCode || 500,
        msg : err.message || 'intrnal server error'
    }


    console.log(customError)
    res.status(customError.statusCode).json({message:customError.msg})
}

module.exports = errorhandler