import { connectToDB } from "./db/schema";
import { serve } from "./router/httpServer";
import { serveSocket } from "./router/socketServer";

serve();
serveSocket();
connectToDB();
