import express from 'express';
import { allUsers, getUser, getUserDevices, updateUser } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.route('/').get(verifyToken, allUsers);
router.route('/:id').get(verifyToken, getUser).patch(verifyToken, updateUser);
router.route('/:id/devices').get(verifyToken, getUserDevices);

export { router as userRouter };
