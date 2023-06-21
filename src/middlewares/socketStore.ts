import { Socket } from "socket.io";
import { setSocketId } from "../inc/caching";
import { env } from "process";
import { FailureMiddleware } from "../inc/failureMiddleware";

export default async function socketStore(socket: Socket, next: any) {
  try {
    const auth = String(socket.handshake.headers.auth);
    const user_name = JSON.parse(auth).user_name;
    await setSocketId(user_name, socket.id);
    return next();
  } catch {
    return next(new FailureMiddleware("PACKAGE_CORRUPTED").error());
  }
}
