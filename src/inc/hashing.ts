import { env } from "process";
import bcrypt from "bcrypt";

export async function hashTheVal(value: string | any) {
  const hashedToken = bcrypt.hashSync(value ?? "", getRandomSalt());
  return hashedToken;
}

function getRandomSalt() {
  const max: number = parseInt(env.REMEMBER_TOKEN_HASH_SALT_ROUNDS_MAX ?? "20");
  const min: number = parseInt(env.REMEMBER_TOKEN_HASH_SALT_ROUNDS_MIN ?? "1");
  const randomNumber: number = Math.random() * (max - min) + min;
  return bcrypt.genSaltSync(randomNumber);
}

export async function checkHash(
  plainPassword: string,
  hashedPassword: string | undefined
) {
  return bcrypt.compareSync(plainPassword, hashedPassword ?? "");
}
