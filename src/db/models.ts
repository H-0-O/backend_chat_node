import mongoose, { Model } from "mongoose";

import { userSchema } from "./schema";
import { UserModelSchema } from "../interfaces/userInterface";

export const UserModel: Model<UserModelSchema> = mongoose.model(
  "user",
  userSchema
);
