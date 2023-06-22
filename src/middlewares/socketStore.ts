import { Socket } from "socket.io";
// import { setSocketId } from "../inc/caching";
import { FailureMiddleware } from "../inc/failureMiddleware";
import { addActiveSocketId } from "../inc/caching";

export default async function socketStore(socket: Socket, next: any) {
  try {
    const socketAuthInfo = String(socket.handshake.headers.auth);
    const senderUserName = JSON.parse(socketAuthInfo).user_name;
    const addSocketId = addActiveSocketId(senderUserName, socket.id);
    return addSocketId
      ? next()
      : next(new FailureMiddleware("PACKAGE_CORRUPTED").error());
  } catch {
    return next(new FailureMiddleware("PACKAGE_CORRUPTED").error());
  }
}
