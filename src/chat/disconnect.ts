import { Socket } from "socket.io";
import { deleteSocketId, getSocketId } from "../inc/caching";

export async function disconnect(socket: Socket) {
  if (socket.handshake.headers.auth) {
    const auth = String(socket.handshake.headers.auth);
    const user_name = JSON.parse(auth).user_name;
    getSocketId(user_name) && deleteSocketId(user_name);
  }
}
