const Joi = require("joi");

const signUpValidator = Joi.object({
  first_name: Joi.string().max(255).required(),
  last_name: Joi.string().required().trim(),
  email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const logInValidator = Joi.object({
    email: Joi.string()
        .email(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  })

async function signUpValidationMiddleware(req, res, next) {
  const authorPayload = req.body;
  try {
    await signUpValidator.validateAsync(authorPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function logInValidationMiddleware(req, res, next) {
    const authorPayload = req.body;
    try {
      await logInValidator.validateAsync(authorPayload);
      next();
    } catch (error) {
      next({
        message: error.details[0].message,
        status: 400,
      });
    }
  }

module.exports = {signUpValidationMiddleware, logInValidationMiddleware};
