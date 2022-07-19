import { Credential, User } from "@prisma/client";
import Cryptr from "cryptr";

import * as CR from "../repositories/credentialRepository.js";

import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";
import { CreateCredentialData } from "../schemas/credentialSchema.js";

import "./../config/setup.js";

const cryptrSecret = process.env.CRYPTR_SECRET || "secret";
const CRYPTR = new Cryptr(cryptrSecret);

export async function createNewCredential(user: User, credentialInfo: CreateCredentialData) {
  const registeredCrendential = await CR.findByTitleAndUserId(credentialInfo.title, user.id);
  
  if (registeredCrendential) {
    throw new AppError(
      "Title alrealdy used",
      401,
      "Title alrealdy used",
      "Ensure to provide a new credential name"
    );
  }
  credentialInfo.password = CRYPTR.encrypt(credentialInfo.password);

  await CR.createCredential(user.id, credentialInfo);
  AppLog("Service", "Credential Created");
}

export async function getAllCredentials(userId: number) {
  const credentialsResult = await CR.getCredentials(userId);
  const credentials = credentialsResult.map((credential: Credential) => {
    credential.password = CRYPTR.decrypt(credential.password);
    delete credential.userId;
    return credential;
  });
  AppLog("Service", "Credentials found");
  return credentials;
}

export async function getOneCredential(credentialId: number, userId: number) {
    const credential = await CR.getCredential(credentialId);
    if (!credential) {
      throw new AppError(
        "Credential not found",
        404,
        "Credential not found",
        "Ensure to provide valid Ids"
      );
    }
    await validCredentialById(credential, userId);
  
    credential.password = CRYPTR.decrypt(credential.password);
    delete credential.userId;
    AppLog("Service", "Credential found");
    return credential;
  }

export async function deleteOneCredential(credentialId: number, userId: number) {
  const credential = await CR.getCredential(credentialId);
  if (!credential) {
    throw new AppError(
      "Credential not found",
      404,
      "Credential not found",
      "Ensure to provide valid Ids"
    );
  }
  await validCredentialById(credential, userId);

  await CR.deleteCredential(credential.id);
  AppLog("Service", "Credential deleted");
}

async function validCredentialById(credential: Credential, userId: number) {
  if (credential.userId !== userId) {
    throw new AppError(
      "CredentialId and UserId are not the same",
      422,
      "CredentialId and UserId are not the same",
      "Ensure to provide valid Ids"
    );
  }
}
