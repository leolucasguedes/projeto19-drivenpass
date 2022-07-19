import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import { validToken } from "../middlewares/tokenValidator.js";
import cardSchema from "../schemas/cardSchema.js";
import * as CC from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/cards/create", validToken, validSchema(cardSchema, "/cards/create"), CC.addCard);
cardRouter.get("/cards", validToken, CC.getUserCards);
cardRouter.get("/cards/:id", validToken, CC.getCardById);
cardRouter.delete("/cards/:id/delete", validToken, CC.deleteCard);

export default cardRouter;