import { Request, Response } from "express";
import UserModel from "../db/models/userModel";
import { checkHash } from "../inc/hashing";
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
  } catch {
    next(failed());
  }

  next(failed());
}

function failed() {
  const errData = JSON.stringify({
    type: "NO_AUTH",
  });
  return Error(errData);
}
