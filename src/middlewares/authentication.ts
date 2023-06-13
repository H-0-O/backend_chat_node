import { Request, Response } from "express";
import { Socket } from "socket.io";

export function isAuthenticated(req: Request, res: Response, next: any) {
  const rememberToken = req.headers?.remember_token;

  next();
}
