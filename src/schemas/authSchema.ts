import Joi from "joi";

import { CreateUserData } from "../repositories/authRepository.js";

const userSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default userSchema;