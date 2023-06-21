import { disconnect } from "../chat/disconnect";
import ptp from "../chat/messaging/ptp";
import {
  isAuthenticated,
  isValidReceiver,
} from "../middlewares/authentication";
import socketStore from "../middlewares/socketStore";
import { io } from "./server";
import roomStore from "../middlewares/roomStore";

// namespaces

export function socketEventRegister() {
  io.engine.use(isAuthenticated);

  const messaging = io.of("/messaging");
  messaging.use(socketStore);
  //events
  messaging.on("connection", async (socket) => {
    // socket.join("room1");
    socket.use(([event, ...args], next) => isValidReceiver(event, args, next));
    socket.use(([event, ...args], next) =>
      roomStore(event, args, messaging, socket, next)
    );
    // TODO room creation must be complete
    socket.on("PTP", (data) => ptp(data, socket));
    // when connection drop delete socket id from ids
    socket.on("disconnect", () => disconnect(socket));
  });
}
