const Joi = require("joi");

module.exports = {

  createTodo: Joi.object({
    title: Joi.string().label('title').required().trim(),
    description: Joi.string().label('description').required().trim()
  }),

  updateTodo: Joi.object({
    id:Joi.number().label('id').required(),
    title: Joi.string().label('title').optional().trim(),
    description: Joi.string().label('description').optional().trim(),
    marked:Joi.boolean().label("marked").optional()
  }),
  deleteToDo:Joi.object({
    id:Joi.number().label('id').required()
  })
}