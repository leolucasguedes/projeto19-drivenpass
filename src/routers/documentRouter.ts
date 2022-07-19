import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import { validToken } from "../middlewares/tokenValidator.js";
import documentSchema from "../schemas/documentSchema.js";
import * as DC from "../controllers/documentController.js";

const documentRouter = Router();

documentRouter.post("/documents", validToken, validSchema(documentSchema, "/documents"), DC.addDocument)
documentRouter.get('/documents', validToken, DC.getUserDocuments)
documentRouter.get('/documents/:id', validToken, DC.getDocumentById)
documentRouter.delete('/documents/:id/delete', validToken, DC.deleteDocument)

export default documentRouter;