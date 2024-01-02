import express from "express";
const router = express.Router();

import { CartController } from "../controllers/cart.controller.js";


router.post("/addCartItem", CartController.addCartItem);

router.get("/getCartById", CartController.getCartById);



export default router;
