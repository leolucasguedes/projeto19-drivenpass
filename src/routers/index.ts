import { Router } from "express";

import authRouter from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";
import cardRouter from "./cardRouter.js";
import noteRouter from "./noteRouter.js";
import wifiRouter from "./wifiRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(cardRouter);
router.use(noteRouter);
router.use(wifiRouter);

export default router;