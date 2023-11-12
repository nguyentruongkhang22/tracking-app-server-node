import express from "express";
import {
  allUsers,
  getUser,
  getUserDevices,
  updateUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.route("/").get(verifyToken, allUsers);
router.route("/devices").get(verifyToken, getUserDevices);
router.route("/:id").get(verifyToken, getUser).patch(verifyToken, updateUser);

export { router as userRouter };
