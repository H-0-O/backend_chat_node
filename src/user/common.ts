import { env } from "process";
import UserModel from "../db/models/userModel";
import { LoginInfoInterface } from "../interfaces/userInterface";

export async function getUserByUserNameOrEmail(loginInfo: LoginInfoInterface) {
  try {
    const query = UserModel.findOne();
    query.or([
      {
        userName: loginInfo.userName,
      },
      {
        email: loginInfo.email,
      },
    ]);
    query.select({ password: true, userName: true });
    return await query.exec();
  } catch (e) {
    env.USER_REGISTER_DEBUG && console.log(`[user/common] => ${e}`);
    return false;
  }
}
