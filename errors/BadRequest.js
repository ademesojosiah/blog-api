const UnAuthorisedError = require('./UnAuthorisedError')

class BadRequest extends UnAuthorisedError{
    constructor(message){
        super(message)
        this.statusCode = 404
    }
}

module.exports = BadRequest