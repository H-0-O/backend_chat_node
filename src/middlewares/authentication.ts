import { Request, Response } from "express";
import UserModel from "../db/models/userModel";
import { checkHash } from "../inc/hashing";
import { messageUserInterface } from "../interfaces/messageInterface";
import { FailureMiddleware } from "../inc/failureMiddleware";
import { Socket } from "socket.io";

export async function isAuthenticated(req: Request, res: Response, next: any) {
  try {
    const auth = JSON.parse(String(req.headers.auth));
    if (auth.user_name && auth.token) {
      const user = await UserModel.findOne({
        userName: auth.user_name,
      }).select({ rememberToken: true });
      const check = await checkHash(auth.token, user?.rememberToken);
      if (check) return next();
    }
  } catch (_) {}
  const failedObj = new FailureMiddleware("NO_AUTH");
  next(failedObj.error());
}

export async function isValidReceiver(
  event: string,
  args: Array<messageUserInterface>,
  next: () => void
) {
  const receiver = args[0].receiver;
  const user = await UserModel.findOne({
    userName: receiver,
  }).select({ id: true });
  if (user) return next();
}

export function socketIdCheck(
  socket: Socket,
  next: (err?: Error | undefined) => void
) {
  console.log(socket.id);
  next();
}
