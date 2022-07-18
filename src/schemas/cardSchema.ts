import { Card } from "@prisma/client";
import Joi from "joi";

type CardData = Omit<Card, "id">
export type CreateCardData = Omit<Card, "createdAt">

const cardSchema = Joi.object<CardData>({
  title: Joi.string().required(),
  number: Joi.string()
    .pattern(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/)
    .required(),
  holderName: Joi.string().required(),
  cvv: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .required(),
  expiryDate: Joi.string()
    .pattern(/^(0[0-9]|1[0-2])\/([0-9]{2})$/)
    .required(),
  password: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid("credit", "debit", "both"),
});

export default cardSchema;
