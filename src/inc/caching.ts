import NodeCache from "node-cache";
import { env } from "process";

const socketIds = new NodeCache();
const rooms = new NodeCache();

// const roomNames ;
export async function setSocketId(userName: string, socketId: string) {
  // store username and socketId for fast accessing in program
  socketIds.set<string>(userName, socketId);
}

export function getSocketId(userName: string): string | undefined {
  return socketIds.get(userName);
}

export function deleteSocketId(userName: string) {
  socketIds.del(userName);
}

export function checkUser(userName: string): boolean {
  return socketIds.has(userName);
}

export function setRoom(roomName: string, roomUsers: string[]) {
  rooms.set(roomName, roomUsers);
}
export function findRoomByUserName(userName: string) {
  console.log(rooms);
}
