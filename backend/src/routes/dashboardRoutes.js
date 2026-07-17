import express from 'express';
import { getAdminDashboard } from '../controller/dashboardController/adminDashboard/adminDashboard.js';
import { authorize } from '../middleware/authorizeRole.js';
import { authorization } from '../middleware/authMiddleware.js';
const dashboardRouter=express.Router();
dashboardRouter.use(authorization);
dashboardRouter.get('/dashboard/admin',authorize('admin'),getAdminDashboard);
export  default dashboardRouter;