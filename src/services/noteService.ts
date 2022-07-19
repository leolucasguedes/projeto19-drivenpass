import { Note } from "@prisma/client";

import * as NR from "../repositories/noteRepository.js"

import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

import { CreateNoteData } from "../schemas/noteSchema.js";

export async function addNewNote(noteInfo: CreateNoteData, userId: number) {
  const registeredNote = await NR.findByTitleAndUserId(noteInfo.title, userId);

  if (registeredNote) {
    throw new AppError(
        "Title alrealdy used",
        401,
        "Title alrealdy used",
        "Ensure to provide a new note name"
      );
  }

  const noteData = { ...noteInfo, userId };

  await NR.createSafeNote(noteData);
  AppLog("Service", "Note created");
}

export async function getAllNotes(userId: number) {
  const result = await NR.getSafeNotes(userId);
  const notes = result.map((note: Note) => {
    delete note.userId;
    return note;
  });
  AppLog("Service", "Notes found");
  return notes;
}

export async function getNoteById(noteId: number, userId: number) {
  const note = await NR.getNote(noteId, userId);
  if (!note) {
    throw new AppError(
      "Note not found",
      404,
      "Note not found",
      "Ensure to provide valid Ids"
    );
  }

  await validNoteByUser(note, userId);

  delete note.userId;
  AppLog("Service", "Note found");
  return note;
}

export async function deleteNote(noteId: number, userId: number) {
  const note = await NR.getNote(noteId, userId);
  if (!note) {
    throw new AppError(
      "Note not found",
      404,
      "Note not found",
      "Ensure to provide valid Ids"
    );
  }

  await validNoteByUser(note, userId);

  await NR.deleteSafeNote(noteId);
}

async function validNoteByUser(note: Note, userId: number) {
  if (note.userId !== userId) {
    throw new AppError(
      "There is not a note for this id",
      422,
      "There is not a note for this id",
      "Ensure to provide valid Ids"
    );
  }
}