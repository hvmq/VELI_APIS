import express from "express";
const router = express.Router();

import { OtpController } from "../controllers/otp.controller.js";

// router.post("/sendOtp", OtpController.sendOtp);
router.post("/verifyOtp", OtpController.verifyOtp);
router.post("/sendOtpByEmail", OtpController.sendOtpByEmail);
export default router;
