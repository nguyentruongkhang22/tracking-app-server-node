import express from 'express';
import { login, logout, register } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);

export { router as authRouter };
