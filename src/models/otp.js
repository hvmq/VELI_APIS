import mongoose from "mongoose";
import User from "./user.js";

const otp = new mongoose.Schema({
    email : {
        type: String
    },
    otp: {
        type: String
    },

})

const Otp  = mongoose.model("otp", otp, "otp");
export default Otp;