import express from "express";
import {
  login,
  logout,
  register,
  verify,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/verify-token", verify);

export { router as authRouter };
