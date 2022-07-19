import prisma from "../config/database.js";
import { CreateWifiData } from "../schemas/wifiSchema.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.wifi.findFirst({where: { title,userId}})}

export async function createWifi(data:CreateWifiData) {
    return prisma.wifi.create({data})
}

export async function getUserWifis(userId:number) {
    return await prisma.wifi.findMany({where:{userId}})
}

export async function getWifi(id:number,userId:number) {
    return await prisma.wifi.findFirst({where:{id, userId}})
}

export async function deleteWifi(id:number) {
    return await prisma.wifi.delete({where:{id}})
}