import Joi from 'joi';

export const registerSchema=Joi.object({
    userName:Joi.string().min(3).required(),
    userEmail: Joi.string()
    .email({ tlds: { allow: false } }) // avoid strict TLD errors
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email should be in correct format",
    }),

password:Joi.string().min(6).required(),
role:Joi.string().valid("admin","HR","employee").default("employee")})


export const loginSchema=Joi.object({
    userEmail:Joi.string()
    .email({ tlds: { allow: false } }) // avoid strict TLD errors
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email should be in correct format",
    }),
    password:Joi.string().min(6).required()
})