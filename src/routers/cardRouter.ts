import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import { validToken } from "../middlewares/tokenValidator.js";
import cardSchema from "../schemas/cardSchema.js";
import * as CC from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/card/create", validToken, validSchema(cardSchema, "/card/create"), CC.addCard);
cardRouter.get("/card", validToken, CC.getUserCards);
cardRouter.get("/card/:id", validToken, CC.getCardById);
cardRouter.delete("/card/delete/:id", validToken, CC.deleteCard);

export default cardRouter;