import connectToDB from "./db/connection";
import { runServer } from "./router/server";
import "dotenv/config";
async function main() {
  await connectToDB();
  runServer();
}

main();
