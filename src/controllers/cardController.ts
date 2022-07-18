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
  const user: User = res.locals.user;
  const { id } = req.params;

  const card = await CS.getCardById(Number(id), user.id);

  res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
  const user: User = res.locals.user;
  const cardId: number = parseInt(req.params.id);

  await CS.deleteCard(cardId, user.id);

  res.sendStatus(200);
}