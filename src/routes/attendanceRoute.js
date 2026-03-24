import express from 'express';
import { authorization } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeRole.js';
import { employee_check_in, employee_check_out, view_all_attendance, view_own_attendance } from '../controller/attendanceController/attendanceController.js';
import { validate } from '../middleware/validations.js';
import { attendanceSchema } from '../validations/attendanceValidation.js';

const attendanceRoute=express.Router();
attendanceRoute.use(authorization)
attendanceRoute.post('/attendance/check-in',
    authorize("employee"),
    validate({body:attendanceSchema}),
    employee_check_in)
attendanceRoute.post('/attendance/check-out',
    authorize("employee"),
    validate({body:attendanceSchema}),
    employee_check_out)
attendanceRoute.get('/attendance/view-all-attendance',authorize("admin","HR"),view_all_attendance)
attendanceRoute.get('/attendance/view-own-attendance',authorize('employee'),view_own_attendance)
export default attendanceRoute;