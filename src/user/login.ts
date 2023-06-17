import { Request } from "express";
import { LoginInfoInterface } from "../interfaces/userInterface";
import UserModel from "../db/models/userModel";
import { getUserByUserNameOrEmail } from "./common";
import { filed, success } from "../inc/response";
import { generateRememberToken } from "../inc/tokenGenerator";
import { env } from "process";
import { checkHash, hashTheVal } from "../inc/hashing";

export async function login(req: Request) {
  const loginInfo: LoginInfoInterface = req.body;
  const user = await getUserByUserNameOrEmail(loginInfo);
  try {
    if (user) {
      if (await isUserValid(user.id)) {
        const checkPassword = await checkHash(
          loginInfo.password,
          user?.password
        );
        if (checkPassword) {
          const newRememberToken = generateRememberToken();
          await user.updateOne({
            rememberToken: await hashTheVal(newRememberToken),
          });
          return success({
            user_name: user.userName,
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
