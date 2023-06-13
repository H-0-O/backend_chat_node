import express, { Request, Response } from "express";
import "dotenv/config";
import { register, tokenValidation } from "../user/register";
import { login } from "../user/login";
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
httpServer.post("/user/register", async (req: Request, res: Response) =>
  res.send(await register(req))
);
httpServer.post("/user/login", async (req: Request, res: Response) => {
  res.send(await login(req));
});

export { serve };
