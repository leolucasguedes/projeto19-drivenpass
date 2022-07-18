import { NextFunction, Request, Response } from "express";
import { findUser } from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";

import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

import "../config/setup.js";

export async function validToken(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) {
    throw new AppError(
      "Missing token",
      401,
      "Missing token",
      "Ensure to provide a valid token"
    );
  }

  const validation = jwt.verify(token, process.env.JWT_SECRET);

  if (!validation) {
    throw new AppError(
      "Token invalid",
      401,
      "Token invalid",
      "Ensure to provide a valid token"
    );
  }

  const user = await findUser(Number(userId));

  if (user.email !== validation) {
    throw new AppError(
      "Token invalid",
      401,
      "Token invalid",
      "Ensure to provide a valid token"
    );
  }

  res.locals.user = user;
  AppLog("Middleware", "Token validated");
  next();
}
