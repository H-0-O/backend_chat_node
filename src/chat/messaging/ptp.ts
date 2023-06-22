import { Socket } from "socket.io";
// import { getRoomName } from "../../inc/caching";
import { messageUserInterface } from "../../interfaces/messageInterface";

// private sending message from one person to another person (ptp)
export default async function ptp(data: messageUserInterface, socket: Socket) {
  // const roomName: string | undefined = getRoomName(data.receiver);
  // if (roomName) {
  //   sendMessage(roomName, data.text, socket);
  // }
}

function sendMessage(roomName: string, message: string, Socket: Socket) {
  // messaging.to(socketId).emit("PTP", message);
  Socket.to(roomName).emit("PTP", "hello");
}
