import { createHash, randomUUID } from "node:crypto";

export function generateRememberToken() {
  const hash = createHash("sha256");
  const current_date = new Date().valueOf().toString();
  const random = Math.random().toString();
  hash.write(current_date + random);
  hash.end();
  return hash.read().toString("hex");
}

export function generateEmailValidationToken() {
  const hash = createHash("sha256");
  const current_date = new Date().valueOf().toString();
  const random = Math.random().toString();
  hash.write(current_date + random + randomUUID);
  hash.end();
  return hash.read().toString("hex");
}
