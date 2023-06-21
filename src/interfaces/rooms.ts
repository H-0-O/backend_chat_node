import { Schema } from "mongoose";

export enum RoomTypes {
  PTP,
  Group,
  Chanel,
}

export interface Room {
  createdAt: {
    type: Date;
    default: () => Date;
  };
  type: RoomTypes;
  roomHash: string;
  UID: Schema.Types.UUID;
  roomUsers: string[];
}
