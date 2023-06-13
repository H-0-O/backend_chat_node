import { Server } from "socket.io";
import { createServer } from "http";
import { isAuthenticated } from "../middlewares/authentication";
const port = parseInt(process.env.SOCKET_PORT ?? "2050");

const httpServer = createServer();
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket: any) => {});

socketServer.engine.use(isAuthenticated);

httpServer.listen(port, "localhost");
