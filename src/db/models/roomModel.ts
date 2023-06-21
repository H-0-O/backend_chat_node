import { Schema, Model } from "mongoose";
import { Room, RoomTypes } from "../../interfaces/rooms";

const roomSchema = new Schema<Room>({
  createdAt: {
    type: Date,
    default: () => Date(),
  },
  roomHash: String,
  roomUsers: [String],
  type: RoomTypes,
  UID: Schema.Types.UUID,
});

const RoomModel = new Model("room", roomSchema);

export default RoomModel;
