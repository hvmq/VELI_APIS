import mongoose from "mongoose";
import School from "./school.js";

let user = new mongoose.Schema({
    full_name : {
        type: String
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    status: {
        type: Number
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://ramenparados.com/wp-content/uploads/2019/03/no-avatar-png-8.png"
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    date_of_birth: {
        type: String,
    },
    school_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: School,
    },
});

const User = mongoose.model("user", user, "user");
export default User;
