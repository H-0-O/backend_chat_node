import express, { Request, Response } from "express";
import "dotenv/config";
import { register, tokenValidation } from "../user/register";
import { Hash, createHash, randomBytes, randomFill } from "crypto";
const httpServer = express();

function serve() {
  httpServer.listen(process.env.HTTP_PORT, () => {
    console.log("http app is started");
  });
}
httpServer.use(express.json());
// GET METHODS
httpServer.get(
  "/user/email_validation/:token",
  async (req: Request, res: Response) => {
    res.send(await tokenValidation(req));
  }
);
// POST METHODS
httpServer.post("/user", async (req: Request, res: Response) =>
  res.send(await register(req))
);

export { serve };
