import { Wifi } from "@prisma/client";
import Joi from "joi";

type WifiData = Omit<Wifi, "id">
export type CreateWifiData = Omit<WifiData, "createdAt">

const wifiSchema = Joi.object<CreateWifiData>({
  title: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

export default wifiSchema;