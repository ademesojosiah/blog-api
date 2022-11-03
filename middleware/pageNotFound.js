const { BadRequest } = require("../errors")

const pageNotFound = (req,res)=>{
    throw new BadRequest('page not found')
}

module.exports = pageNotFound