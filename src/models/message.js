import mongoose from "mongoose";
import ChatRoom from "./chat_room.js";

const message = new mongoose.Schema({
    chat_room_id : {
        type: mongoose.Schema.Types.ObjectId,
    },
    message : {
        type: String,
    },
    userId: {
        type: String
    }
})

const Message  = mongoose.model("message", message, "message");
export default Message;