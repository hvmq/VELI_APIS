import express from "express";
const router = express.Router();

import { ChatRoomController } from "../controllers/chat_room.controller.js";

router.post('/createChatRoom', ChatRoomController.createChatRoom);
router.get('/getChatRoomsByUserId', ChatRoomController.getChatRoomsByUserId);
router.get('/getChatRoomById/:roomId', ChatRoomController.getChatRoomById);

export default router;
