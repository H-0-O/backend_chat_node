import { Namespace, Socket } from "socket.io";
import {
  removeActiveSocketId,
  removeAllPTPRoomsHaveTheUser,
} from "../inc/caching";
// import { deleteSocketId, getUserSocketInfo } from "../inc/caching";

export async function disconnect(socket: Socket, namespace: Namespace) {
  try {
    if (socket.handshake.headers.auth) {
      const userName = JSON.parse(
        String(socket.handshake.headers.auth)
      )?.user_name;
      removeAllPTPRoomsHaveTheUser(userName);
      removeActiveSocketId(userName, socket.id);
      // getUserSocketInfo(user_name) && deleteSocketId(user_name);
    } else {
      console.log("doesn't have auth");
    }
  } catch {}
}
