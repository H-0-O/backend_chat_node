import { disconnect } from "../chat/disconnect";
import ptp from "../chat/messaging/ptp";
import { checkRoom } from "../inc/caching";
import {
  isAuthenticated,
  isValidReceiver,
  socketIdCheck,
} from "../middlewares/authentication";
import roomManager from "../middlewares/roomManager";
import socketStore from "../middlewares/socketStore";
import { expressApp, io } from "./server";
// import roomStore from "../middlewares/roomStore";

// namespaces

export function socketEventRegister() {
  io.engine.use(isAuthenticated);
  const messaging = io.of("/messaging");
  messaging.use(socketIdCheck);
  messaging.use(socketStore);
  //events
  messaging.on("connection", async (socket) => {
    // socket.join("room1");
    socket.use(([event, ...args], next) => isValidReceiver(event, args, next));
    socket.use(([event, ...args], next) =>
      roomManager(args[0], messaging, socket, next)
    );
    // TODO room creation must be complete
    socket.on("PTP", (data) => ptp(data, socket));
    socket.on("PTPC", (data) => checkRoom());
    // when connection drop delete socket id from ids
    socket.on("disconnect", () => disconnect(socket, messaging));
  });
}
