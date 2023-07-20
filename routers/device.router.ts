import express from 'express';
import { allDevices, getDevice, getTimeVariantData, newDevice, updateDevice, updateTimeVariantData } from '../controllers/device.controller';

const router = express.Router();

router.route('/').get(allDevices).post(newDevice);
router.route('/:id').get(getDevice).put(updateDevice).patch(updateDevice);
router.route('/:id/tvr').get(getTimeVariantData).patch(updateTimeVariantData);

export { router as deviceRouter };
