import { Socket } from "socket.io";
import { setSocketId } from "../inc/caching";
import { env } from "process";

export default async function socketStore(socket: Socket, next: any) {
  try {
    const auth = String(socket.handshake.headers.auth);
    const user_name = JSON.parse(auth).user_name;
    const setSocketID = await setSocketId(user_name, socket.id);
    return next();
  } catch {
    return next(failed());
  }
}

function failed() {
  const errData = JSON.stringify({
    type: "INTERNAL_ERROR",
    message: env.SOCKET_MIDDLEWARE_DEBUG ? "middlewares/socketStore" : "",
  });
  return Error(errData);
}
