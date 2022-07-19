import { Card } from "@prisma/client";
import Cryptr from "cryptr";

import * as CR from "../repositories/cardRepository.js";

import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

import { CreateCardData } from "../schemas/cardSchema.js";

import "../config/setup.js"

const cryptrSecret = process.env.CRYPTR_SECRET || "secret";
const CRYPTR = new Cryptr(cryptrSecret);

export async function addNewCard(cardInfo: CreateCardData, userId: number) {
  const registeredCard = await CR.findByTitleAndUserId(cardInfo.title, Number(userId));
    if (registeredCard) {
      throw new AppError(
        "Title alrealdy used",
        401,
        "Title alrealdy used",
        "Ensure to provide a new card name"
      );
    }
  cardInfo.cvv = CRYPTR.encrypt(cardInfo.cvv);
  cardInfo.password = CRYPTR.encrypt(cardInfo.password);

  await CR.createCard(userId, cardInfo);
  AppLog("Service", "Card added");
}

export async function getAllCards(userId: number) {
  const cardsResult = await CR.getCards(userId);
  const cards = cardsResult.map((card: Card) => {
    delete card.userId;
    card.cvv = CRYPTR.decrypt(card.cvv);
    card.password = CRYPTR.decrypt(card.password);
    return card;
  });
  AppLog("Service", "Cards found");
  return cards;
}

export async function getOneCard(cardId: number, userId: number) {
  const card = await CR.getCard(cardId, userId);
  if (!card) {
    throw new AppError(
      "Card not found",
      404,
      "Card not found",
      "Ensure to provide valid Ids"
    );
  }

  await validCardByUser(card, userId);

  delete card.userId;
  card.cvv = CRYPTR.decrypt(card.cvv);
  card.password = CRYPTR.decrypt(card.password);

  AppLog("Service", "Card found");
  return card;
}

export async function deleteOneCard(cardId: number, userId: number) {
  const card = await CR.getCard(cardId, userId);
  if (!card) {
    throw new AppError(
      "Card not found",
      404,
      "Card not found",
      "Ensure to provide valid Ids"
    );
  }

  await validCardByUser(card, userId);

  await CR.deleteCard(cardId);
  AppLog("Service", "Card deleted");
}

async function validCardByUser(card: Card, userId: number) {
  if (card.userId !== userId) {
    throw new AppError(
      "There is not a card for this id",
      422,
      "There is not a card for this id",
      "Ensure to provide valid Ids"
    );
  }
}
