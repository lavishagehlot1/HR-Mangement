import express from 'express';
import { authorization } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeRole.js';
import { apply_for_leave, approveLeaveRequestById, rejectLeaveById, viewLeaveHistory, viewLeaveRequest } from '../controller/leaveController/leaveController.js';
const leaveRoutes=express.Router();
leaveRoutes.use(authorization)
leaveRoutes.post('/apply/leave',authorize("employee"),apply_for_leave);
leaveRoutes.get('/fetch/leaves',authorize("admin","HR"),viewLeaveRequest);
leaveRoutes.get('/fetch/leaveHistory/me',authorize("employee"),viewLeaveHistory);
leaveRoutes.put('/approveLeave/:id',authorize("admin","HR"),approveLeaveRequestById);
leaveRoutes.put('/reject/:id',authorize("admin","HR"),rejectLeaveById)
export default leaveRoutes