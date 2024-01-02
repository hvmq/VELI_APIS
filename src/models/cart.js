import mongoose from "mongoose";
import User from "./user.js";
import Document from "./document.js";

const cart = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    cart_items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Document,
    },

})

const Cart  = mongoose.model("cart", cart, "cart");
export default Cart;