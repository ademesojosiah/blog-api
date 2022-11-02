const pageNotFound = (req,res)=>{
    res.status(404).json({mesage:"page not found"})
}

module.exports = pageNotFound