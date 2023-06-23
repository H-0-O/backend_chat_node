import { Namespace, Socket } from "socket.io";
import { messageUserInterface } from "../interfaces/messageInterface";
import {
  findRoomNameByRoomName,
  findRoomNameByUserNames,
  getActiveSocketIds,
  setNewRoomToRoomMap,
} from "../inc/caching";
import crypto from "node:crypto";
import _ from "lodash";
import { FailureMiddleware } from "../inc/failureMiddleware";
import { RoomTypes } from "../interfaces/roomDBSchema";
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

// function isOtherDevice(userName: string) {
//   return checkUser(userName) && getUserSocketInfo(userName)?.roomName;
// }

export default function roomManager(
  args: messageUserInterface,
  messaging: Namespace,
  socket: Socket,
  next: (err?: Error) => void
) {
  try {
    const senderUserName = JSON.parse(
      String(socket.handshake.headers.auth)
    )?.user_name;

    const receiverUserName = args.receiver;
    const receiverActiveSocketIds = getActiveSocketIds(receiverUserName);
    console.log(receiverActiveSocketIds);

    // checking receiver is online or not
    if (receiverActiveSocketIds) {
      // checking user has a room or not
      if (!findRoomNameByUserNames(senderUserName, receiverUserName)) {
        const roomName = createRoomName(receiverActiveSocketIds[0], socket.id);
        createRoom(
          roomName,
          [socket.id, receiverActiveSocketIds[0]],
          messaging
        );
        storeRoom(roomName, senderUserName, receiverUserName);
      } else {
        // console.log("in second else");
      }
    } else {
      // console.log("in else");
    }
    next();
  } catch (_) {
    next(new FailureMiddleware("Internal_Error").error());
  }
}

function createRoomName(socketIDFirst: string, socketIdSecond: string) {
  let searchInSocketsInfos;
  let roomName;
  do {
    const nonHashValue = socketIDFirst + Date.now().toString() + socketIdSecond;
    roomName = crypto.createHash("md5").update(nonHashValue).digest("hex");
    searchInSocketsInfos = findRoomNameByRoomName(roomName);
  } while (searchInSocketsInfos);
  return roomName;
}

async function createRoom(
  roomName: string,
  socketIDS: string[],
  messaging: Namespace
) {
  const setMap = new Set<string>();
  const addSocketIDS = async () => {
    _.forEach(socketIDS, (value) => {
      setMap.add(value);
    });
  };
  await addSocketIDS();
  messaging.adapter.rooms.set(roomName, setMap);
}

function storeRoom(
  roomName: string,
  senderUserName: string,
  receiverUserName: string
) {
  setNewRoomToRoomMap(roomName, RoomTypes.PTP, [
    senderUserName,
    receiverUserName,
  ]);
}
