import User from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // Import dotenv for dynamic environment variables

dotenv.config(); // Load environment variables from .env file

export const AuthController = {

  //Region login
  loginwithPhone: async (req, res) => {
    try {
      let user = await User.findOne({ phone: req.body.phone });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Username does not exist" });
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
         
      return res
        .status(200)
        .json({ success: true, message: "Login success", user: user });
    
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //End region

  //Region login
  loginwithEmail: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Username does not exist" });
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Login success", user: user });
      // const token = jwt.sign(
      //   { id: user._id, phone: user.phone },
      //   "secret",
      //   { expiresIn: "1h" }
      // );
      // return res.status(200).json({ success: true, token: token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //End region
};
