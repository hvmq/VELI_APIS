import mongoose from "mongoose";
import User from "../models/user.js";
import Cart from "../models/cart.js";
export const CartController = {
  addCartItem: async (req, res) => {
    try {
      const { userId, documentId } = req.body;
      const newCartItem = new Cart({
        user_id: userId,
        cart_items: documentId
      });
  
      await newCartItem.save();
      console.log('Item added to cart successfully');
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
    }
  },
  getCartById: async (req, res) => {
    try {
      const { userId } = req.body;
        const cart = await Cart.find({ user_id: userId }).populate("cart_items");
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
  
};
