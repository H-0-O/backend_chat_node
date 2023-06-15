import { Request } from "express";
import { LoginInfoInterface } from "../interfaces/userInterface";
import { UserModel } from "../db/models";
import {
  checkHashPassword,
  getUserByUserNamerOrEmail,
  hashRememberToken,
} from "./common";
import { filed, success } from "../inc/response";
import { generateRememberToken } from "../inc/tokenGenerator";
import { env } from "process";

export async function login(req: Request) {
  const loginInfo: LoginInfoInterface = req.body;
  const user = await getUserByUserNamerOrEmail(loginInfo);
  try {
    if (user) {
      if (await isUserValid(user.id)) {
        const checkPassword = checkHashPassword(
          loginInfo.password,
          user?.password
        );
        if (checkPassword) {
          const newRememberToken = generateRememberToken();
          await UserModel.findByIdAndUpdate(user.id, {
            rememberToken: hashRememberToken(newRememberToken),
          });
          return success({
            rememberToken: newRememberToken,
          });
        }
      } else {
        return filed({
          code: 403,
          message: "user not validation yet",
        });
      }
    } else {
      return filed({
        code: 401,
        message: "un auth",
      });
    }

    return "ok";
  } catch (e) {
    return filed({
      code: 500,
      message: env.APP_DEBUG ? e : "internal error",
    });
  }
}

async function isUserValid(id: string) {
  const user = await UserModel.findById(id)
    .select({
      "activation.validateAt": true,
    })
    .where({
      "activation.token": null,
      "activation.sendAt": null,
    });
  if (user?.activation?.validateAt) {
    return true;
  }
  return false;
}
function getUserByUserNamerOrEmailEX(loginInfo: LoginInfoInterface) {
  throw new Error("Function not implemented.");
}
