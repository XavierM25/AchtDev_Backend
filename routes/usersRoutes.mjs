import express from 'express';
import { registerUser, getUserProfile } from '../controllers/usersControllers.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.get('/profile', authMiddleware, getUserProfile);

export default router;