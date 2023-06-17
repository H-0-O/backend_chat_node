import mongoose, { Model, Schema } from "mongoose";
import { messageSchemaInterface } from "../../interfaces/messageInterface";

const messageSchema = new Schema<messageSchemaInterface>({
  senderUUID: String,
  to: {
    user: String,
    group: String,
    chanel: String,
  },
  text: String,
  submittedAt: {
    type: Date,
    default: () => Date(),
  },
});

const MessageModel: Model<messageSchemaInterface> = mongoose.model(
  "message",
  messageSchema
);

export default MessageModel;
