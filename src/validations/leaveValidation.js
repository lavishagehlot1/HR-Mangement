import Joi from 'joi';
 export const applyLeaveSchema=Joi.object({
employee_id:Joi.string().length(24).hex(),//mongoose objetId is of 24 character and hexadecimal
leaveType:Joi.string().required().trim(),
start_Date:Joi.date().required(),
end_Date:Joi.date().greater(Joi.ref('start_Date')).required(),
reason:Joi.string().min(8).required()

 })
 export const leaveIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required(), // leave id in params
});