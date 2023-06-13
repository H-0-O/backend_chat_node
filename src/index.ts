import { connectToDB } from "./db/schema";
import { serve } from "./router/httpServer";
import { serveSocket } from "./router/socketServer";

async function main() {
  await connectToDB();
  serve();
  serveSocket();
}

main();
