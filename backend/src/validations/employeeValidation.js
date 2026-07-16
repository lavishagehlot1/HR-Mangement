import Joi from 'joi';

export const employeeCreateSchema=Joi.object({
    userId:Joi.string().length(24).hex().required(),
    department:Joi.string().min(3).required(),
    role_of_employee:Joi.string().min(3).required(),
    joining_Date:Joi.date().required()
});

export const employeeUpdateSchema=Joi.object({
    department:Joi.string().min(3),
    role_of_employee:Joi.string().min(3),
    joining_Date:Joi.date()
});
export const idSchema = Joi.object({
  id: Joi.string().length(24).hex().required(),
});