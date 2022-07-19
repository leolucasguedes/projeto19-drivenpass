import { Document, User } from "@prisma/client";

import * as DR from "../repositories/documentRepository.js";

import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";
import { CreateDocumentData } from "../schemas/documentSchema.js";

export async function createNewDocument(user: User, documentInfo: CreateDocumentData) {
  const registeredDocument = await DR.findByTitleAndUserId(documentInfo.title, user.id);
  
  if (registeredDocument) {
    throw new AppError(
      "Title alrealdy used",
      401,
      "Title alrealdy used",
      "Ensure to provide a new document name"
    );
  }

  await DR.createDocument(user.id, documentInfo);
  AppLog("Service", "Document Created");
}

export async function getAllDocuments(userId: number) {
  const result = await DR.getDocuments(userId);
  const documents = result.map((document: Document) => {
    delete document.userId;
    return document;
  });
  
  AppLog("Service", "Documents found");
  return documents;
}

export async function getOneDocument(documentId: number, userId: number) {
    const document = await DR.getDocument(documentId, userId);
    if (!document) {
      throw new AppError(
        "Document not found",
        404,
        "Document not found",
        "Ensure to provide valid Ids"
      );
    }
    await validDocumentById(document, userId);
  
    delete document.userId;
    AppLog("Service", "Document found");
    return document;
  }

export async function deleteOneDocument(documentId: number, userId: number) {
  const document = await DR.getDocument(documentId, userId);
  if (!document) {
    throw new AppError(
      "Document not found",
      404,
      "Document not found",
      "Ensure to provide valid Ids"
    );
  }
  await validDocumentById(document, userId);

  await DR.deleteDocument(document.id);
  AppLog("Service", "Document deleted");
}

async function validDocumentById(document: Document, userId: number) {
  if (document.userId !== userId) {
    throw new AppError(
      "DocumentId and UserId are not the same",
      422,
      "DocumentId and UserId are not the same",
      "Ensure to provide valid Ids"
    );
  }
}