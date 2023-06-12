import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { UserModelSchema } from "../interfaces/userInterface";
const { Schema } = mongoose;

export const userSchema = new Schema<UserModelSchema>({
  firstName: String,
  userName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  UID: {
    type: Schema.Types.UUID,
    default: () => randomUUID(),
  },
  rememberToken: String,
  activation: {
    token: {
      type: String,
    },
    sendAt: {
      type: Date,
      default: () => Date(),
    },
    validateAt: {
      type: Date,
      default: null,
    },
  },
});

export async function connectToDB() {
  await mongoose.connect(
    "mongodb://chat_user:chat_123@localhost:27017/chat_backend"
  );
  //   const dbInstance = mongoose
  //   .createConnection("mongodb://localhost:27017/chat_backend", {
  //     user: "chat_user",
  //     pass: "chat_123",
  //     connectTimeoutMS: 20000,
  //   })
  //   .asPromise();
}
