import express from 'express';
import { authorization } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeRole.js';
import { createEmployee, deleteEmployeeById, getAllEmployee, getEmployeeById, getMyProfile, updateEmployeeById } from '../controller/employeeController/employeeController.js';
const employeeRoute=express.Router();
employeeRoute.use(authorization)
employeeRoute.post("/employee",authorize('admin'),createEmployee);
employeeRoute.get('/employee/me',authorize("employee"),getMyProfile);
employeeRoute.get('/allEmployee',authorize("admin","HR"),getAllEmployee);
employeeRoute.get('/getEmployee/:id',authorize("admin","HR"),getEmployeeById);
employeeRoute.put('/update/:id',authorize("admin","HR"),updateEmployeeById);
employeeRoute.delete('/delete/:id',authorize('admin'),deleteEmployeeById)
export default employeeRoute