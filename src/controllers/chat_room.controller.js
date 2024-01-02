import mongoose from "mongoose";
import ChatRoom from "../models/chat_room.js";

export const ChatRoomController = {
    createChatRoom: async (req, res) => {
        const { userId1, userId2 } = req.body;

        try {
            // Check if a chat room with these users already exists
            const existingRoom = await ChatRoom.findOne({
                $or: [
                    { userId1: userId1, userId2: userId2 },
                    { userId1: userId2, userId2: userId1 }
                ]
            });

            if (existingRoom) {
                return res.status(400).send('Chat room already exists.');
            }

            // Create new chat room
            const newChatRoom = new ChatRoom({ userId1, userId2 });
            await newChatRoom.save();
            res.status(201).send(newChatRoom);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getChatRoomsByUserId: async (req, res) => {
        const { userId } = req.body; 
        try {
            const chatRooms = await ChatRoom.find({
                $or: [{ userId1: userId }, { userId2: userId }]
            }).populate("userId1").populate("userId2");
            res.status(200).send(chatRooms);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getChatRoomById: async (req, res) => {
        const { roomId } = req.params;

        try {
            const chatRoom = await ChatRoom.findById(roomId).populate("userId1").populate("userId2").populate("messages");
            if (!chatRoom) {
                return res.status(404).send('Chat room not found.');
            }
            res.status(200).send(chatRoom);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

};
