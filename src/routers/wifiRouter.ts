import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import { validToken } from "../middlewares/tokenValidator.js";
import wifiSchema from "../schemas/wifiSchema.js";
import * as WC from "../controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.post("/:userId/notes/create", validToken, validSchema(wifiSchema, "/wifi/create"), WC.addWifi);
wifiRouter.get("/:userId/notes", validToken, WC.getUserWifis);
wifiRouter.get("/:userId/notes/:id", validToken, WC.getWifi);
wifiRouter.delete("/:userId/notes/:id/delete", validToken, WC.deleteWifi);

export default wifiRouter;