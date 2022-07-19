import { Document } from "@prisma/client";
import Joi from "joi";

type DocumentData = Omit<Document, "id">
export type CreateDocumentData = Omit<DocumentData, "createdAt">;

const documentSchema = Joi.object<CreateDocumentData>({
  title: Joi.string().required(),
  type: Joi.string().valid("CNH", "RG").required(),
  fullName: Joi.string().required(),
  expeditionDate: Joi.string()
    .pattern(/^(0[0-9]|1[0-9]|2[0-9]|3[0-1])\/(0[0-9]|1[0-2])\/([0-9]{2})$/)
    .required(),
  expirationDate: Joi.string()
    .pattern(/^(0[0-9]|1[0-9]|2[0-9]|3[0-1])\/(0[0-9]|1[0-2])\/([0-9]{2})$/)
    .required(),
  docNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  issuer: Joi.string().required(),
});

export default documentSchema;
