const Joi = require("joi");

module.exports = {

  LoginUser: Joi.object({
    password: Joi.string().label('password').required().trim(),
    email:Joi.string().label("email").required()
  }),

  SignUpUser: Joi.object({
    name: Joi.string().label('name').required().trim(),
    password: Joi.string().label('password').required().trim(),
    email:Joi.string().label("email").required()
  }),


}