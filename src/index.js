//#region import package
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http, { get } from "http";
import { Server } from "socket.io"; 


import { initializeSocket } from "./socket/socket.js";
// import { Log } from "./utils/log.js";
// import admin from "mongodb-admin";

//#region initialize server
dotenv.config();

const app = express();
// app.use(Log.writeFromClient);

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

//#region setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//#end region

//#region import router
import documentRouter from "./routers/document.router.js";
import authRouter from "./routers/auth.router.js";
import schoolRouter from "./routers/school.router.js";
import otpRouter from "./routers/otp.router.js";
import chatroomRouter from "./routers/chat_room.router.js"
import userRouter from "./routers/user.router.js";
import messageRouter from "./routers/message.router.js";
import cartRouter from "./routers/cart.router.js";

//#region setup router
app.use("/document", documentRouter);
app.use("/auth", authRouter);
app.use("/school", schoolRouter);
app.use("/otp", otpRouter);
app.use("/chatroom", chatroomRouter);
app.use("/message", messageRouter);
app.use("/cart", cartRouter);

app.use("/user", userRouter);

let io;
io = new Server(server);

var clients = {};

  io.on("connection", (socket) => {
    console.log("connected");
    console.log(socket.id, "has joined");
  
    socket.on("signin", (id) => {
      console.log(id);
      clients[id] = socket;
      console.log(clients);
    });
  
    socket.on("message", (msg) => {
      console.log(msg);
      let targetId = msg.targetId;
      if (clients[targetId]) clients[targetId].emit("message", msg);
    });
  });





mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB!!!");
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB");
    console.log(e.message);
  });

//#end region

//#region start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
//#end region

//#region Connect socket
// import { sockets } from "./sockets/sockets.js";
// sockets.startSocketServer(server);
//#end region

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello World!",
  });
});
export default app;
