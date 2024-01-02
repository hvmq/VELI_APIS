import mongoose from "mongoose";

const school = new mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
    image: {
        type: String
    }
})

const School  = mongoose.model("school", school, "school");
export default School;