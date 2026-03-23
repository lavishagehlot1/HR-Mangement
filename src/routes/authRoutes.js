import express from 'express';
import { loginUser, registerUser } from '../controller/authController/authController.js';
import { authorization } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeRole.js';

const authRouter=express.Router();
authRouter.post('/register',authorization,authorize("admin"),registerUser);
authRouter.post('/login',loginUser)
export default authRouter;