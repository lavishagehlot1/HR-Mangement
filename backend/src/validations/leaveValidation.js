import Joi from 'joi';
 export const applyLeaveSchema=Joi.object({
employeeId:Joi.string().length(24).hex(),//mongoose objetId is of 24 character and hexadecimal
leaveType:Joi.string().required().trim(),
startDate:Joi.date().required(),
endDate:Joi.date().greater(Joi.ref('start_Date')).required(),
reason:Joi.string().min(8).required()

 })
 export const leaveIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required(), // leave id in params
});