import { Router } from "express";

import validSchema from "../middlewares/schemaValidator.js"
import userSchema from "../schemas/authSchema.js";
import * as AC from "../controllers/authController.js"

const authRouter = Router();

authRouter.post("/signup", validSchema(userSchema, "./signup"), AC.registerUser);
authRouter.post("/signin", validSchema(userSchema, "/signin"), AC.loginUser);

export default authRouter;