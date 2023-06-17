import { Schema } from "mongoose";

export interface messageSchemaInterface {
  senderUUID: string;
  to: {
    user?: string;
    group?: string;
    chanel?: string;
  };
  text?: string;
  submittedAt: {
    type: Date;
    default: () => string;
  };
  seeingInfo?: {
    user?: boolean;
    group?: boolean;
    chanel?: number;
  };
}

export interface messageUserInterface {
  text: string;
  to: string;
}
