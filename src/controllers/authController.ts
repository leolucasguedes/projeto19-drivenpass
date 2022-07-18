import { Request, Response } from "express";

import { CreateUserData } from "../repositories/authRepository.js";
import * as AS from "../services/authService.js";

export async function registerUser(req: Request, res: Response) {
  const userInfo: CreateUserData = res.locals.body;

  await AS.createUser(userInfo);

  res.sendStatus(201);
}

export async function loginUser(req: Request, res: Response) {
  const userInfo: CreateUserData = res.locals.body;

  const token = await AS.loginUser(userInfo);

  res.status(200).send({ token });
}