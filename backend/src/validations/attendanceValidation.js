import Joi from 'joi';
//checkin anf checkout
export const attendanceSchema=Joi.object({
    employeeId:Joi.string().length(24).hex(),
    checkInTime:Joi.date(),
    checkOutTime:Joi.date().greater(Joi.ref('check_in_time')),
    date:Joi.date(),
    workingHours:Joi.number(),
    statusOfAttendance:Joi.string().valid("present","absent","half day"),
    autoCheckedOut:Joi.boolean()
}

)