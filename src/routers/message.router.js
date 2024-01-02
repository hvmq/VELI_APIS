import express from "express";
const router = express.Router();

import { MessageController } from "../controllers/message.controller.js";


router.post("/createMessage", MessageController.createMessage);

router.put("/updateMessage/:messageId", MessageController.updateMessage);

router.get("/getAllMessageChatRoomId", MessageController.getAllMessageChatRoomId)


export default router;