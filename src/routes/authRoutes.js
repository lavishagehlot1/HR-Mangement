import express from 'express';
import { loginUser, registerUser } from '../controller/authController/authController.js';
import { authorization } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/authorizeRole.js';
import { loginSchema, registerSchema } from '../validations/authValidations.js';
import { validate } from '../middleware/validations.js';

const authRouter=express.Router();
authRouter.post('/register',
    authorization,
    authorize("admin"),
    validate({ body: registerSchema }),
    registerUser
);

authRouter.post('/login',
    validate({ body: loginSchema }),
    loginUser
);
export default authRouter;