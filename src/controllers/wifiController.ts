import { User } from "@prisma/client";
import { Request, Response } from "express";

import { CreateWifiData } from "../schemas/wifiSchema.js";
import * as WS from "../services/wifiService.js";

export async function addWifi(req: Request, res: Response) {
  const user: User = res.locals.user;
  const wifiInfo: CreateWifiData = res.locals.body;

  await WS.addNewWifi(wifiInfo, user.id);

  res.sendStatus(201);
}

export async function getUserWifis(req: Request, res: Response) {
  const user: User = res.locals.user;
  const wifis = await WS.getAllWifis(user.id);

  res.status(200).send(wifis);
}

export async function getWifi(req: Request, res: Response) {
  const user: User = res.locals.user;
  const { id } = req.params;

  const wifi = await WS.getWifiById(Number(id), user.id);

  res.status(200).send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
  const user: User = res.locals.user;
  const { id } = req.params;

  await WS.deleteWifi(Number(id), user.id);

  res.sendStatus(200);
}