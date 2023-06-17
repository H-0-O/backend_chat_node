import { disconnect } from "../chat/disconnect";
import { newMessage } from "../chat/newMessage";
import { isAuthenticated } from "../middlewares/authentication";
import socketStore from "../middlewares/socketStore";
import { io } from "./server";

export function socketEventRegister() {
  io.engine.use(isAuthenticated);
  io.use(socketStore);
  io.on("connection", async (socket) => {
    socket.on("newMessage", (data) => newMessage(data));

    // when connection drop delete socket id from ids
    socket.on("disconnect", () => disconnect(socket));
  });
}
