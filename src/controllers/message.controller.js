import mongoose from "mongoose";
import Message from "../models/message.js";
import ChatRoom from "../models/chat_room.js";

export const MessageController = {

    createMessage: async (req, res) => {
        const { chat_room_id, message, userId } = req.body;

        try {
            // Create new message
            const newMessage = new Message({ chat_room_id, message, userId });
            await newMessage.save();
            await ChatRoom.findByIdAndUpdate(
                chat_room_id,
                { $push: { messages: newMessage._id } },
                { new: true }  // Return the updated document
            );
            res.status(201).send(newMessage);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    updateMessage: async (req, res) => {
        const { messageId } = req.params;
        const { message } = req.body;

        try {
            // Find the message by ID and update it
            const updatedMessage = await Message.findByIdAndUpdate(
                messageId,
                { message: message },
                { new: true }  // Return the updated document
            );

            if (!updatedMessage) {
                return res.status(404).send('Message not found.');
            }

            res.status(200).send(updatedMessage);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getAllMessageChatRoomId: async (req, res) => {
        const { chat_room_id } = req.body;
        try {
            const messages = await Message.find({
                chat_room_id: chat_room_id
            });
            res.status(200).send(messages);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

};
