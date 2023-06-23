import express, { Request, Response } from "express";
import { register, tokenValidation } from "../user/register";
import { login } from "../user/login";
import { expressApp, io } from "./server";
import { checkRoom } from "../inc/caching";

export function httpRouteRegister() {
  expressApp.use(express.json());
  // GET METHODS
  expressApp.get(
    "/user/email_validation/:token",
    async (req: Request, res: Response) => {
      res.send(await tokenValidation(req));
    }
  );
  expressApp.get("/check", (req: Request, res: Response) => {
    checkRoom();
    res.send();
  });

  // POST METHODS
  expressApp.post("/user/register", async (req: Request, res: Response) =>
    res.send(await register(req))
  );
  expressApp.post("/user/login", async (req: Request, res: Response) => {
    res.send(await login(req));
  });

  expressApp.get("/checkAd", (req, res) => {
    console.log(io.of("/messaging").adapter.rooms);
    res.send();
  });
}
