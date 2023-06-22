export interface SocketsInfoInterface {
  socketId?: string;
  roomName?: string;
}

export interface NodeCacheDataInterface {
  t?: number;
  v?: SocketsInfoInterface;
}

export interface SocketClientsInterface {
  activeRoomsIndex?: number[];
  activeSocketIds?: string[];
}

export interface PTPRoomInterface {
  roomName: string;
  roomClientUserName: string[];
}
