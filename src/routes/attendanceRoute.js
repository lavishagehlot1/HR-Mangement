import express from 'express';
import { authorization } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeRole.js';
import { employee_check_in, employee_check_out, view_all_attendance, view_own_attendance } from '../controller/attendanceController/attendanceController.js';

const attendanceRoute=express.Router();
attendanceRoute.use(authorization)
attendanceRoute.post('/attendance/check-in',authorize("employee"),employee_check_in)
attendanceRoute.post('/attendance/check-out',authorize("employee"),employee_check_out)
attendanceRoute.get('/attendance/view-all-attandance',authorize("admin","HR"),view_all_attendance)
attendanceRoute.get('/attendance/view-own-attandance',authorize('employee'),view_own_attendance)
export default attendanceRoute;