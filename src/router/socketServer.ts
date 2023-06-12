import express from "express";
import "dotenv/config";

const socketServer = express();

function serveSocket() {
  socketServer.listen(process.env.SOCKET_PORT, () => {
    // console.log("socket app  is started");
  });
}

socketServer.get("/", (req, res) => {
  console.log("in socket app");
  res.send("ok socket");
});

export { serveSocket };
