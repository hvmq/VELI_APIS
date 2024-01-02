import mongoose from "mongoose";
import User from "./user.js";
import School from "./school.js";


const document = new mongoose.Schema({
    school_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: School
    },
    subject: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    is_free: {
        type: Boolean
    },
    price: {
        type: Number,
    },
    image: {
        type: Array,
        default: []
    },
    is_sold : {
        type: Boolean,
    },
    address: {
        type: String,
    },
    created_at: {
        type: String,
        default: Date.now()
    },
    modified_at: {
        type: String,
        default: Date.now()
    },
    created_by : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    
})

const Document  = mongoose.model("document", document, "document");
export default Document;