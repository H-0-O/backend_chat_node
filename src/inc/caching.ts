import NodeCache, { Data } from "node-cache";
import _ from "lodash";
import {
  SocketClientsInterface,
  SocketsInfoInterface,
} from "../interfaces/cachingInterfaces";

const socketClients = new NodeCache();
const rooms = new NodeCache();
// const roomNames ;
// export function setSocketId(userName: string, socketId: string): void {
//   // store username and socketId for fast accessing in program
//   socketsInfos.set<SocketsInfoInterface>(userName, {
//     socketId,
//   });
// }

// export function getUserSocketInfo(
//   userName: string
// ): SocketsInfoInterface | undefined {
//   return socketsInfos.get(userName);
// }

// export function deleteSocketId(userName: string): void {
//   socketsInfos.del(userName);
// }

// export function checkUser(userName: string): boolean {
//   return socketsInfos.has(userName);
// }
// export function setRoomNameSocketInfo(
//   roomName: string,
//   userNames: string[]
// ): void {
//   _.forEach(userNames, (userName) => {
//     const socketInfo: SocketsInfoInterface | undefined =
//       socketsInfos.get(userName);
//     socketsInfos.set<SocketsInfoInterface>(userName, {
//       socketId: socketInfo?.socketId,
//       roomName: roomName,
//     });
//   });
// }
// export function findRoomNameByRoomName(roomName: string) {
//   const infos: Data = socketsInfos.data;
//   return _.findKey<Data>(infos, (info) => info.v?.roomName === roomName);
// }

// export function getRoomName(userName: string) {
//   const socketInfo: SocketsInfoInterface | undefined =
//     socketsInfos.get(userName);
//   return socketInfo?.roomName;
// }

// export function getSocketId(username: string) {
//   const socketInfo: SocketsInfoInterface | undefined =
//     socketsInfos.get(username);
//   return socketInfo?.socketId;
// }

export function addActiveSocketId(userName: string, socketId: string) {
  const oldInfo = socketClients.get<SocketClientsInterface>(userName);
  let newInfo = {
    ...oldInfo,
  };
  if (!oldInfo) {
    newInfo = {
      activeSocketIds: [],
      activeRoomsIndex: [],
    };
  }

  newInfo?.activeSocketIds?.push(socketId);
  return socketClients.set<SocketClientsInterface>(userName, newInfo);
}
