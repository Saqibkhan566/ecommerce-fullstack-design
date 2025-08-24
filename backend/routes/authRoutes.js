// backend/routes/authRoutes.js
import { Router } from 'express';
import { loginUser, registerUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;