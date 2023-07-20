import express from 'express';
import { allUsers, getUser, getUserDevices, newUser, updateUser } from '../controllers/user.controller';

const router = express.Router();

router.route('/').get(allUsers).post(newUser);
router.route('/:id').get(getUser).patch(updateUser);
router.route('/:id/devices').get(getUserDevices);

export { router as userRouter };
