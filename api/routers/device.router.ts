import express from "express";
import {
  allDevices,
  getDevice,
  getTimeVariantData,
  newDevice,
  updateDevice,
  updateTimeVariantData,
} from "../controllers/device.controller";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.route("/").get(verifyToken, allDevices).post(newDevice);
router
  .route("/:id")
  .get(verifyToken, getDevice)
  .put(updateDevice)
  .patch(updateDevice);
router
  .route("/:id/tvr")
  .get(verifyToken, getTimeVariantData)
  .patch(updateTimeVariantData);

export { router as deviceRouter };
