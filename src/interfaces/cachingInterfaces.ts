import { RoomTypes } from "./roomDBSchema";

export interface SocketsInfoInterface {
  socketId?: string;
  roomName?: string;
}

export interface NodeCacheDataInterface {
  t?: number;
  v?: SocketsInfoInterface;
}

export interface SocketClientsInterface {
  activeSocketIds?: string[];
}

export interface PTPRoomInterface {
  roomName: string;
  roomClientUserName: string[];
}

export interface RoomInterface {
  roomName: string;
  roomType: RoomTypes;
  roomUsers: string[];
}
