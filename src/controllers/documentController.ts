import { User, Document } from "@prisma/client";
import { Request, Response } from "express";

import { CreateDocumentData } from "../schemas/documentSchema.js";
import * as DS from "../services/documentService.js";

export async function addDocument(req: Request, res: Response) {
  const user: User = res.locals.user;
  const documentInfo: CreateDocumentData = req.body;

  await DS.createNewDocument(user, documentInfo);

  res.sendStatus(201);
}

export async function getUserDocuments(req: Request, res: Response) {
  const user: User = res.locals.user;
  const documents = await DS.getAllDocuments(user.id);

  res.status(200).send(documents);
}

export async function getDocumentById(req: Request, res: Response) {
  const { id } = req.params;
  const user: User = res.locals.user;

  const wifi = await DS.getOneDocument(Number(id), user.id);

  res.status(200).send(wifi);
}

export async function deleteDocument(req: Request, res: Response) {
  const { id } = req.params;
  const user: User = res.locals.user;

  await DS.deleteOneDocument(Number(id), user.id);

  res.sendStatus(200);
}