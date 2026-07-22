import Joi from 'joi';
import { JOB_ROLES } from '../constants/jobRoles.js';
import { DEPARTMENTS } from '../constants/department.js';

export const employeeCreateSchema=Joi.object({
    userId:Joi.string().length(24).hex().required(),
    department:Joi.string().valid(...DEPARTMENTS).min(3).required(),
    roleOfEmployee:Joi.string().valid(...JOB_ROLES).min(3).required(),
    joiningDate:Joi.date().required()
});

export const employeeUpdateSchema=Joi.object({
    department:Joi.string().valid(...DEPARTMENTS).min(3),
    roleOfEmployee:Joi.string().valid(...JOB_ROLES).min(3),
    joiningDate:Joi.date()
});
export const idSchema = Joi.object({
  id: Joi.string().length(24).hex().required(),
});