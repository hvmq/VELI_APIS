import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";


export const UserController = {
  //UPDATE
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when update user",
      });
    }
  },
  //Region add new user
  createUser: async (req, res) => {
    try {
      const data = new User({
        full_name: req.body.full_name,
        phone: req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });

      const user = await User.create(data);
      return res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //GET An USER
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.status(200).json({user});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ email: email });
      const encryptedPassword = await bcrypt.hash(password, 10);
      user.password = encryptedPassword;
      await user.save();
      res.status(200).json({
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const userId = req.params.userId;
      const user = await User.findById(userId);
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);

      if (isValidPassword) {
        user.password = bcrypt.hashSync(newPassword, 10);
        await user.save();
        res.status(200).json({ message: "Đổi mật khẩu thành công!" });
      } else {
        res.status(400).json({ message: "Đổi không thành công!" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
