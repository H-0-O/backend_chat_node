import { Socket } from "socket.io";
import { getSocketId } from "../../inc/caching";
import { messageUserInterface } from "../../interfaces/messageInterface";

// private sending message from one person to another person (ptp)
export default async function ptp(data: messageUserInterface, socket: Socket) {
  const toSocketId: string | undefined = getSocketId(data.receiver);
  if (toSocketId) {
    sendMessage(toSocketId, data.text, socket);
  }
}

function sendMessage(socketId: string, message: string, Socket: Socket) {
  // messaging.to(socketId).emit("PTP", message);
  Socket.to("testRoom").emit("PTP", "hello");
}
