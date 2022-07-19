import { Note } from "@prisma/client";
import Joi from "joi";

type NoteData = Omit<Note, "id">
export type CreateNoteData = Omit<NoteData, "createdAt">

const noteSchema = Joi.object<CreateNoteData>({
  title: Joi.string().max(50).required(),
  content: Joi.string().max(1000).required(),
});

export default noteSchema;