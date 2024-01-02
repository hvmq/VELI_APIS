import { Server } from "socket.io";

const clients = {};

export function initializeSocket(server) {
    const io = new Server(server);

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
}
