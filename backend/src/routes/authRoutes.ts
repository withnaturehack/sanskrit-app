import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { login, register } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema } from '../validation/schemas';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));

export default router;
