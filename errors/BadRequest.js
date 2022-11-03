const UnAuthorisedError = require('./UnAuthorisedError')

class BadRequest extends UnAuthorisedError{
    constructor(message){
        super(message)
        this.statusCode = 400
    }
}

module.exports = BadRequest