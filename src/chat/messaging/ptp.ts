import { Socket } from "socket.io";
// import { getRoomName } from "../../inc/caching";
import { messageUserInterface } from "../../interfaces/messageInterface";
import { findRoomNameByUserNames } from "../../inc/caching";

// private sending message from one person to another person (ptp)
export default async function ptp(data: messageUserInterface, socket: Socket) {
  const senderUserName = JSON.parse(
    String(socket.handshake.headers.auth)
  )?.user_name;

  const roomName = getRoomName(senderUserName, data.receiver);

  roomName && sendMessage(roomName, data.text, socket);

  // const roomName: string | undefined = getRoomName(data.receiver);
  // if (roomName) {
  //   sendMessage(roomName, data.text, socket);
  // }
}

function sendMessage(roomName: string, message: string, Socket: Socket) {
  Socket.to(roomName).emit("PTP", "hello");
}

function getRoomName(senderUserName: string, receiverUserName: string) {
  return findRoomNameByUserNames(senderUserName, receiverUserName);
}
