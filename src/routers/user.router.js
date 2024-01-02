import express from "express";
const router = express.Router();


import { UserController } from "../controllers/user.controller.js";

router.put("/resetpassword", UserController.resetPassword);
router.put("/updatePassword/:userId", UserController.updatePassword);
router.post("/createUser", UserController.createUser);
router.get("/getUser/:userId", UserController.getUser);

export default router;
