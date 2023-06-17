import { Request } from "express";
import UserModel from "../db/models/userModel";
import {
  generateEmailValidationToken,
  generateRememberToken,
} from "../inc/tokenGenerator";
import { env } from "process";
import { UserInfo } from "../interfaces/userInterface";
import { sendEmailValidationTemp } from "../inc/sendEmail";
import { filed, success } from "../inc/response";
import { getUserByUserNameOrEmail } from "./common";
import { hashTheVal } from "../inc/hashing";

export async function register(req: Request) {
  try {
    const userInfo: UserInfo = req.body;
    const validationToken = generateEmailValidationToken();
    if (await getUserByUserNameOrEmail(userInfo))
      return filed({
        code: 422,
        message: "user name or email exists before",
      });
    const newUser = new UserModel({
      firstName: userInfo.firstName,
      email: userInfo.email,
      userName: userInfo.userName,
      password: await hashTheVal(userInfo.password),
      activation: {
        token: validationToken,
      },
    });
    const sendValidation = await sendEmailValidationTemp(
      validationToken,
      userInfo
    );
    if (sendValidation) {
      await newUser.save();
      return success(null);
    } else {
      return filed({
        code: 500,
        message: env.APP_DEBUG ? "" : "Email not sent for you please try later",
      });
    }
  } catch (e: any) {
    return filed({
      code: "500",
      message: "email or user is registered",
      unAvailableFields: e.keyValue,
    });
  }
}

export async function tokenValidation(req: Request) {
  const token = req.params.token ?? null;
  if (token) {
    const query = {
      "activation.token": {
        $eq: token,
      },
    };
    const rememberToken = generateRememberToken();
    const user = await UserModel.findOne(query).select(["id", "userName"]);
    if (user) {
      await user.updateOne({
        activation: {
          token: null,
          sendAt: null,
          validateAt: Date(),
        },
        rememberToken: await hashTheVal(rememberToken),
      });
      return success({
        user_name: user.userName,
        remember_token: rememberToken,
      });
    } else {
      return filed({
        code: 404,
        message: "token is invalid",
      });
    }
  }
}
