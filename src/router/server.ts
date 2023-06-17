import express from "express";
import { createServer } from "http";
import "dotenv/config";
import { Server as ioServer } from "socket.io";
import { env } from "process";
import { socketEventRegister } from "./socketEvents";
import { httpRouteRegister } from "./httpRoutes";

export const expressApp = express();
export const server = createServer(expressApp);
export const io = new ioServer(server, {
  path: "/chat/",
});

export function runServer() {
  const port = parseInt(env.HTTP_PORT?.toString() ?? "3020");
  server.listen(port, "localhost", () => {
    console.log("app is started");
  });
  httpRouteRegister();
  socketEventRegister();
}
