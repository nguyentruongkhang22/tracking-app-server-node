import express from 'express';
import { userRouter } from './user.router';
import { deviceRouter } from './device.router';
import { authRouter } from './auth.router';

const router = express.Router();

router.use('/users', userRouter);
router.use('/devices', deviceRouter);
router.use('/auth', authRouter);

export { router as indexRouter };
