// import { Namespace, Socket } from "socket.io";
// import { messageUserInterface } from "../interfaces/messageInterface";
// import { FailureMiddleware } from "../inc/failureMiddleware";
// import {
//   checkUser,
//   findRoomNameByRoomName,
//   getSocketId,
//   getUserSocketInfo,
//   setRoomNameSocketInfo,
// } from "../inc/caching";
// import crypto from "node:crypto";

// export default function roomStore(
//   event: string,
//   args: Array<messageUserInterface>,
//   messaging: Namespace,
//   socket: Socket,
//   next: (err?: Error) => void
// ) {
//   try {
//     const receiver = args[0]?.receiver;

//     const socketAuthInfo = String(socket.handshake.headers.auth);
//     const senderUserName = JSON.parse(socketAuthInfo).user_name;
//     if (isNeedToCreateNewRoom(senderUserName, receiver)) {
//       const receiverSocketId = String(getSocketId(receiver));
//       const setMap = new Set<string>();
//       const roomName = createRoomName(socket.id, receiver);
//       setMap.add(socket.id);
//       setMap.add(receiverSocketId);
//       messaging.adapter.rooms.set(roomName, setMap);
//       console.log(messaging.adapter.rooms);

//       setRoomNameSocketInfo(roomName, [senderUserName, receiver]);
//     } else {
//       console.log("other device");
//     }
//     next();
//   } catch (e) {
//     next(new FailureMiddleware("NO_AUTH").error());
//   }
// }

// function isNeedToCreateNewRoom(sender: string, receiver: string) {
//   const receiverInfo = getUserSocketInfo(receiver);
//   return !receiverInfo || receiverInfo.roomName ? false : true;
// }

// function createRoomName(socketIDFirst: string, socketIdSecond: string) {
//   let searchInSocketsInfos;
//   let roomName;
//   do {
//     const nonHashValue = socketIDFirst + Date.now().toString() + socketIdSecond;
//     roomName = crypto.createHash("md5").update(nonHashValue).digest("hex");
//     searchInSocketsInfos = findRoomNameByRoomName(roomName);
//   } while (searchInSocketsInfos);
//   return roomName;
// }

// function isOtherDevice(userName: string) {
//   return checkUser(userName) && getUserSocketInfo(userName)?.roomName;
// }
