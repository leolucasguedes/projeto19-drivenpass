import { User } from "@prisma/client";
import { Request, Response } from "express";

import { CreateCardData } from "../schemas/cardSchema.js";
import * as CS from "../services/cardService.js";

export async function addCard(req: Request, res: Response) {
  const user: User = res.locals.user;
  const cardInfo: CreateCardData = req.body;

  await CS.addNewCard(cardInfo, user.id);

  res.sendStatus(201);
}

export async function getUserCards(req: Request, res: Response) {
  const user: User = res.locals.user;

  const cards = await CS.getAllCards(user.id);

  res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response) {
  const { id } = req.params;
  const user: User = res.locals.user;

  const card = await CS.getOneCard(Number(id), user.id);

  res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
  const { id } = req.params;
  const user: User = res.locals.user;

  await CS.deleteOneCard(Number(id), user.id);

  res.sendStatus(200);
}