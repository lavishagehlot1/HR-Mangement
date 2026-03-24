import Joi from 'joi';
//checkin anf checkout
export const attendanceSchema=Joi.object({
    employee_id:Joi.string().length(24).hex(),
    check_in_time:Joi.date(),
    check_out_time:Joi.date().greater(Joi.ref('check_in_time')),
    date:Joi.date(),
    working_hours:Joi.number(),
    status_of_attendance:Joi.string().valid("present","absent","half day"),
    autoCheckedOut:Joi.boolean()
}

)