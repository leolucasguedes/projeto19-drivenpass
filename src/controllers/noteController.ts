import { User } from "@prisma/client";
import { Request, Response } from "express";

import { CreateNoteData } from "../schemas/noteSchema.js";
import * as NS from "../services/noteService.js";

export async function addNote(req: Request, res: Response) {
  const user: User = res.locals.user;
  const noteInfo: CreateNoteData = req.body;

  await NS.addNewNote(noteInfo, user.id);

  res.sendStatus(201);
}

export async function getUserNotes(req: Request, res: Response) {
  const user: User = res.locals.user;
  const notes = await NS.getAllNotes(user.id);

  res.status(200).send(notes);
}

export async function getNoteById(req: Request, res: Response) {
  const { id } = req.params;
  const user: User = res.locals.user;

  const note = await NS.getOneNote(Number(id), user.id);

  res.status(200).send(note);
}

export async function deleteNote(req: Request, res: Response) {
  const { id } = req.params;
  const user: User = res.locals.user;

  await NS.deleteOneNote(Number(id), user.id);

  res.sendStatus(200);
}