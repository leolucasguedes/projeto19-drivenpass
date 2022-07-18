import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import { validToken } from "../middlewares/tokenValidator.js";
import credentialSchema from "../schemas/credentialSchema.js";
import * as CC from "../controllers/credentialController.js";

const credentialRouter = Router();

credentialRouter.post("/:userId/credential",validToken ,validSchema(credentialSchema, "/credential"), CC.createCredential)
credentialRouter.get('/:userId/credential', validToken, CC.getUserCredentials)
credentialRouter.get('/:userId/credential/:id', validToken, CC.getCredentialById)
credentialRouter.delete('/:userId/credential/:id', validToken, CC.deleteCredential)

export default credentialRouter;