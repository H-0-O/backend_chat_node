import express, { Request, Response } from "express";
import { register, tokenValidation } from "../user/register";
import { login } from "../user/login";
import { expressApp } from "./server";

export function httpRouteRegister() {
  expressApp.use(express.json());
  // GET METHODS
  expressApp.get(
    "/user/email_validation/:token",
    async (req: Request, res: Response) => {
      res.send(await tokenValidation(req));
    }
  );
  // POST METHODS
  expressApp.post("/user/register", async (req: Request, res: Response) =>
    res.send(await register(req))
  );
  expressApp.post("/user/login", async (req: Request, res: Response) => {
    res.send(await login(req));
  });
}
