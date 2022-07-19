import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import { validToken } from "../middlewares/tokenValidator.js";
import noteSchema from "../schemas/noteSchema.js";
import * as NC from "../controllers/noteController.js";

const noteRouter = Router();

noteRouter.post("/:userId/notes/create", validToken, validSchema(noteSchema, "/notes/create"), NC.addNote);
noteRouter.get("/:userId/notes", validToken, NC.getUserNotes);
noteRouter.get("/:userId/notes/:id", validToken, NC.getNote);
noteRouter.delete("/:userId/notes/:id/delete", validToken, NC.deleteNote);

export default noteRouter;
