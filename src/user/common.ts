import { env } from "process";
import bcrypt from "bcrypt";
import { UserModel } from "../db/models";
import { LoginInfoInterface } from "../interfaces/userInterface";

export function hashPassword(userPlainPassword: string) {
  const hashedPassword = bcrypt.hashSync(userPlainPassword, getRandomSalt());
  return hashedPassword;
}
export function hashRememberToken(rememberToken: string) {
  const hashedToken = bcrypt.hashSync(rememberToken, getRandomSalt());
  return hashedToken;
}

export function checkHashPassword(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

function getRandomSalt() {
  const max: number = parseInt(env.REMEMBER_TOKEN_HASH_SALT_ROUNDS_MAX ?? "20");
  const min: number = parseInt(env.REMEMBER_TOKEN_HASH_SALT_ROUNDS_MIN ?? "1");
  const randomNumber: number = Math.random() * (max - min) + min;
  return bcrypt.genSaltSync(randomNumber);
}

export async function getUserByUserNamerOrEmail(loginInfo: LoginInfoInterface) {
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
    query.select({ password: true });
    return await query.exec();
  } catch (e) {
    return false;
  }
}
