import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import { validToken } from "../middlewares/tokenValidator.js";
import credentialSchema from "../schemas/credentialSchema.js";
import * as CC from "../controllers/credentialController.js";

const credentialRouter = Router();

credentialRouter.post("/credentials", validToken, validSchema(credentialSchema, "/credentials"), CC.createCredential)
credentialRouter.get('/credentials', validToken, CC.getUserCredentials)
credentialRouter.get('/credentials/:id', validToken, CC.getCredentialById)
credentialRouter.delete('/credentials/:id/delete', validToken, CC.deleteCredential)

export default credentialRouter;