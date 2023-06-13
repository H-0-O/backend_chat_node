import { Date, Schema } from "mongoose";

export interface UserInfo {
  userName: string;
  email: string;
  firstName: string;
  password: string;
}

export interface UserModelSchema {
  firstName: string;
  userName: string;
  email: string;
  password: string;
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

export interface LoginInfoInterface {
  userName?: string;
  email?: string;
  password: string;
}
