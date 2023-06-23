import NodeCache, { Data } from "node-cache";
import _ from "lodash";
import {
  RoomInterface,
  SocketClientsInterface,
} from "../interfaces/cachingInterfaces";
import { RoomTypes } from "../interfaces/roomDBSchema";

const clients = new NodeCache();
const roomsMap = new NodeCache();

export function addActiveSocketId(userName: string, socketId: string) {
  const oldInfo = clients.get<SocketClientsInterface>(userName);
  let newInfo = {
    ...oldInfo,
  };
  if (!oldInfo) {
    newInfo = {
      activeSocketIds: [],
    };
  }

  newInfo?.activeSocketIds?.push(socketId);
  return clients.set<SocketClientsInterface>(userName, newInfo);
}

export function checkUserOnline(userName: string): boolean {
  return Boolean(clients.get(userName));
}

export function getActiveSocketIds(userName: string) {
  return clients.get<SocketClientsInterface>(userName)?.activeSocketIds;
}

export function setNewRoomToRoomMap(
  roomName: string,
  roomType: RoomTypes,
  users: string[]
) {
  let lastKey = roomsMap.keys().length;
  lastKey = lastKey == 0 ? -1 : lastKey;
  roomsMap.set<RoomInterface>(lastKey + 1, {
    roomName,
    roomType,
    roomUsers: users,
  });
}

export function findRoomNameByUserNames(
  senderUserName: string,
  receiverUserName: string
) {
  const obj = _.find(roomsMap.data, (value) =>
    value.v.roomUsers.includes(senderUserName, receiverUserName)
  );
  return obj?.v.roomName ?? false;
}

export function findRoomNameByRoomName(roomName: string) {
  const room = _.find(roomsMap.data, (value) => value.v.roomName === roomName);
  return room;
}

export function removeAllPTPRoomsHaveTheUser(userName: string) {
  _.forEach(roomsMap.data, (value, key) => {
    value.v.roomType == RoomTypes.PTP &&
      value.v.roomUsers.includes(userName) &&
      roomsMap.del(key);
  });
}

export function removeActiveSocketId(userName: string, socketId: string) {
  const oldInfo = clients.get<SocketClientsInterface>(userName);
  if (oldInfo?.activeSocketIds) {
    const newActiveSockets = _.pull(oldInfo?.activeSocketIds, socketId);
    oldInfo.activeSocketIds = newActiveSockets;
    clients.set(userName, oldInfo);
  }
}

export function checkRoom() {
  _.forEach(roomsMap.data, (value, key) => {
    // value.v.roomType == RoomTypes.PTP &&
    //   value.v.roomUsers.includes(userName) &&
    //   roomsMap.del(key);
    console.log(value.v);
  });
}
