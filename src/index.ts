import { connectToDB } from "./db/schema";
import { serve } from "./router/httpServer";
import "dotenv/config";
import "./router/socketServer";
async function main() {
  await connectToDB();
  serve();
  // runWebSocket();
}

main();
