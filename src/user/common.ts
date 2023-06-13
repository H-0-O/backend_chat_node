import { env } from "process";
import bcrypt from "bcrypt";

export function hashPassword(userPlainPassword: string) {
  const roundSalt = parseInt(env.PASSWORD_HASH_SALT_ROUNDS ?? "10");
  const hashedPassword = bcrypt.hashSync(userPlainPassword, roundSalt);
  return hashedPassword;
}
export function hashRememberToken(rememberToken: string) {
  const roundSalt = parseInt(env.REMEMBER_TOKEN_HASH_SALT_ROUNDS ?? "20");
  const hashedToken = bcrypt.hashSync(rememberToken, roundSalt);
  return hashedToken;
}

export function checkHashPassword(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}
