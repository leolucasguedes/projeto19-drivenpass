import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import { validToken } from "../middlewares/tokenValidator.js";
import wifiSchema from "../schemas/wifiSchema.js";
import * as WC from "../controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.post("/networks", validToken, validSchema(wifiSchema, "/networks"), WC.addWifi);
wifiRouter.get("/networks", validToken, WC.getUserWifis);
wifiRouter.get("/networks/:id", validToken, WC.getWifiById);
wifiRouter.delete("/networks/:id/delete", validToken, WC.deleteWifi);

export default wifiRouter;