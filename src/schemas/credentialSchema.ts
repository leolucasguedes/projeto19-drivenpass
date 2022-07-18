import { Credential } from "@prisma/client";
import Joi from "joi";

type CredentialData = Omit<Credential, "id">
export type CreateCredentialData = Omit<CredentialData, "createdAt">

const credentialSchema = Joi.object<CredentialData>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default credentialSchema;