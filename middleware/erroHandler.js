const errorhandler = (err,req,res,next) =>{
    const customError = {
        statusCode : err.statusCode || 500,
        msg : err.message || 'intrnal server error'
    }
    if(err.code ===11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}, enter another ${Object.keys(err.keyValue)}`
        customError.statusCode = 400
    }
    if(err.name === "ValidationError"){
        customError.statusCode = 400
        
        const msssg = Object.values(err.errors).map(item => item.message ).join(' and ')
        customError.msg = msssg
    }

    if(err.name === "CastError"){
        customError.msg = `no id with ${err.value}`
        customError.statusCode = 400
    }
        res.status(customError.statusCode).json({status:false, message: customError.msg})
    }

module.exports = errorhandler