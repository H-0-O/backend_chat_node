import { Date, Schema } from "mongoose";

export interface UserInfo {
  userName: string;
  email: string;
  firstName: string;
}

export interface UserModelSchema {
  firstName: string;
  userName: string;
  email: string;
  UID: Schema.Types.UUID;
  rememberToken?: string;
  activation?: {
    token?: string;
    sendAt?: {
      type: Date;
      default: () => string;
    };
    validateAt?: Date;
  };
}
