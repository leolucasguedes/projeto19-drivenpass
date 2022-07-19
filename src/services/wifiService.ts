import { Wifi } from "@prisma/client";
import Cryptr from "cryptr";

import * as WR from "../repositories/wifiRepository.js";

import AppError from "../config/error.js";
import AppLog from "../events/AppLog.js";

import { CreateWifiData } from "../schemas/wifiSchema.js";

import "../config/setup.js"

const cryptrSecret = process.env.CRYPTR_SECRET || "secret";
const CRYPTR = new Cryptr(cryptrSecret);

export async function addNewWifi(wifiInfo: CreateWifiData, userId: number) {
  wifiInfo.password = CRYPTR.encrypt(wifiInfo.password);

  const wifiData = { ...wifiInfo, userId };

  await WR.createWifi(wifiData);
  AppLog("Service", "Wifi added");
}

export async function getAllWifis(userId: number) {
  const wifisResult = await WR.getUserWifis(userId);
  const wifis = wifisResult.map((wifi: Wifi) => {
    delete wifi.userId;
    wifi.password = CRYPTR.decrypt(wifi.password);
    return wifi;
  });
  AppLog("Service", "WifiS found");
  return wifis;
}

export async function getWifiById(wifiId: number, userId: number) {
  const wifi = await WR.getWifi(wifiId, userId);
  if (!wifi) {
    throw new AppError(
      "Wifi not found",
      404,
      "Wifi not found",
      "Ensure to provide valid Ids"
    );
  }

  await validWifiByUser(wifi, userId);

  delete wifi.userId;
  wifi.password = CRYPTR.decrypt(wifi.password);

  AppLog("Service", "Wifi found");
  return wifi;
}

export async function deleteWifi(wifiId: number, userId: number) {
  const wifi = await WR.getWifi(wifiId, userId);
  if (!wifi) {
    throw new AppError(
      "Wifi not found",
      404,
      "Wifi not found",
      "Ensure to provide valid Ids"
    );
  }

  await validWifiByUser(wifi, userId);

  await WR.deleteWifi(wifiId);
  AppLog("Service", "Wifi deleted");
}

async function validWifiByUser(wifi: Wifi, userId: number) {
  if (wifi.userId !== userId) {
    throw new AppError(
      "There is not a wifi for this id",
      422,
      "There is not a wifi for this id",
      "Ensure to provide valid Ids"
    );
  }
}