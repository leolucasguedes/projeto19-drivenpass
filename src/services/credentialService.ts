import { Credential } from "@prisma/client";
import Cryptr from "cryptr";

import * as CR from "../repositories/credentialRepository.js";

import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";
import { CreateCredentialData } from "../schemas/credentialSchema.js";

import "./../config/setup.js";

const cryptrSecret = process.env.CRYPTR_SECRET || "secret";
const CRYPTR = new Cryptr(cryptrSecret);

export async function createCredential(credentialInfo: CreateCredentialData) {
  const { title, userId } = credentialInfo;
  const registeredCrendential = await CR.findByTitleAndUserId(title, userId);
  if (registeredCrendential) {
    throw new AppError(
      "Title alrealdy used",
      401,
      "Title alrealdy used",
      "Ensure to provide a new credential name"
    );
  }
  const cryptPassword = CRYPTR.encrypt(credentialInfo.password);
  const credentialData = { ...credentialInfo, cryptPassword };

  await CR.createCredential(credentialData);
  AppLog("Service", "Credential Created");
}

export async function getAllCredentials(userId: number) {
  const credentialsResult = await CR.getUserCredentials(userId);
  const credentials = credentialsResult.map((credential: Credential) => {
    credential.password = CRYPTR.decrypt(credential.password);
    delete credential.userId;
    return credential;
  });
  AppLog("Service", "Credentials found");
  return credentials;
}

export async function getCredentialById(credentialId: number, userId: number) {
    const credential = await CR.getCredentialById(credentialId);
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
    return credential;
  }

export async function deleteCredential(credentialId: number, userId: number) {
  const credential = await CR.getCredentialById(credentialId);
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
  AppLog("Service", "Credentials deleted");
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
