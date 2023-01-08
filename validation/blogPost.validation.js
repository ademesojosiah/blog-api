const Joi = require("joi");

const addBlogPostValidator = Joi.object({
  title: Joi.string().max(255).required().trim(),
  description: Joi.string().trim(),
  state: Joi.string().valid('Draft', 'Published').default('draft'),
  tags: Joi.string().optional().trim(),
  body: Joi.string().required(),
});

const updateBlogPostValidator = Joi.object({
    title: Joi.string().max(255).trim(),
    description: Joi.string().trim(),
    state: Joi.string().valid('Draft', 'Published'),
    tags: Joi.string().optional().trim(),
    body: Joi.string(),
  })

async function addBlogPostValidationMiddleware(req, res, next) {
  const authorPayload = req.body;
  try {
    await addBlogPostValidator.validateAsync(authorPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function updateBlogPostValidationMiddleware(req, res, next) {
    const authorPayload = req.body;
    try {
      await updateBlogPostValidator.validateAsync(authorPayload);
      next();
    } catch (error) {
      next({
        message: error.details[0].message,
        status: 400,
      });
    }
  }

module.exports = {updateBlogPostValidationMiddleware, addBlogPostValidationMiddleware};
