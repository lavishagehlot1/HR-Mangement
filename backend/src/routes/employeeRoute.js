import express from 'express';
import { authorization } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeRole.js';
import { createEmployee, deleteEmployeeById, getAllEmployee, getEmployeeById, getMyProfile, updateEmployeeById } from '../controller/employeeController/employeeController.js';
import { validate } from '../middleware/validations.js';
import { employeeCreateSchema, employeeUpdateSchema, idSchema } from '../validations/employeeValidation.js';
const employeeRoute=express.Router();
employeeRoute.use(authorization)
employeeRoute.post("/employee",
    authorize('admin'),
    validate({body:employeeCreateSchema}),
    createEmployee);
employeeRoute.get('/employee/me',authorize("employee"),getMyProfile);
employeeRoute.get('/allEmployee',authorize("admin","HR"),getAllEmployee);
employeeRoute.get('/getEmployee/:id',authorize("admin","HR"),getEmployeeById);
employeeRoute.put('/update/:id',authorize("admin","HR"),
    validate({body:employeeUpdateSchema,params:idSchema}),
    updateEmployeeById);
employeeRoute.delete('/delete/:id',authorize('admin'),deleteEmployeeById)
export default employeeRoute