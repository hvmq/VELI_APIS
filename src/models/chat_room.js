import mongoose from "mongoose";
import User from "./user.js";
import Message from "./message.js";

const chat_room = new mongoose.Schema({
    userId1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    userId2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
        default: []
    }]
})

const ChatRoom  = mongoose.model("chat_room", chat_room, "chat_room");
export default ChatRoom;