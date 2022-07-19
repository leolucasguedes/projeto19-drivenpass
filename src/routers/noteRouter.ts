import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import { validToken } from "../middlewares/tokenValidator.js";
import noteSchema from "../schemas/noteSchema.js";
import * as NC from "../controllers/noteController.js";

const noteRouter = Router();

noteRouter.post("/notes", validToken, validSchema(noteSchema, "/notes"), NC.addNote);
noteRouter.get("/notes", validToken, NC.getUserNotes);
noteRouter.get("/notes/:id", validToken, NC.getNoteById);
noteRouter.delete("/notes/:id/delete", validToken, NC.deleteNote);

export default noteRouter;
