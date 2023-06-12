import { Request, Response } from "express";
import { UserModel } from "../db/models";
import {
  generateEmailValidationToken,
  generateRememberToken,
} from "../inc/tokenGenerator";
import { env } from "process";
import { UserInfo } from "../interfaces/userInterface";
import { sendEmailValidationTemp } from "../inc/sendEmail";
import { filed, success } from "../inc/response";

export async function register(req: Request) {
  try {
    const userInfo: UserInfo = req.body;
    const validationToken = generateEmailValidationToken();
    const newUser = new UserModel({
      firstName: userInfo.firstName,
      email: userInfo.email,
      userName: userInfo.userName,
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
        code: "11500",
        message: env.APP_DEBUG ? "" : "Email not sent for you please try later",
      });
    }
  } catch (e) {
    return filed({
      code: "11500",
      message: env.APP_DEBUG ? e : "app is busy please try later",
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
    const user = await UserModel.findOneAndUpdate(
      query,
      {
        activation: {
          token: null,
          sendAt: null,
          validateAt: Date(),
        },
        rememberToken,
      },
      {
        new: true,
      }
    );
    if (user) {
      return success({
        rememberToken,
      });
    } else {
      return filed({
        code: "11404",
        message: "token is invalid",
      });
    }
  }
}
