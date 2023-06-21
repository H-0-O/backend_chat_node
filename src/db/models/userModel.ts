import mongoose, { Model, Schema } from "mongoose";
import { UserModelSchema } from "../../interfaces/userInterface";
import { randomUUID } from "crypto";

const userSchema = new Schema<UserModelSchema>({
  firstName: String,
  userName: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  UID: {
    type: Schema.Types.UUID,
    default: () => randomUUID(),
  },
  rememberToken: {
    type: String,
    unique: true,
  },
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

export const UserModel: Model<UserModelSchema> = mongoose.model(
  "user",
  userSchema
);

export default UserModel;
