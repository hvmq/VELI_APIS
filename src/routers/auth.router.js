import express from "express";
const router = express.Router();

import { AuthController } from "../controllers/auth.controller.js";


router.post("/loginwithPhone", AuthController.loginwithPhone);

router.post("/loginwithEmail", AuthController.loginwithEmail);



export default router;
