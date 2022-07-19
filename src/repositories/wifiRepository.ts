import prisma from "../config/database.js";
import { CreateWifiData } from "../schemas/wifiSchema.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.wifi.findFirst({where: { title,userId}})}

export async function createWifi(userId: number, wifi: CreateWifiData) {
    return prisma.wifi.create({data: {...wifi, userId }})
}

export async function getWifis(userId:number) {
    return await prisma.wifi.findMany({where:{userId}})
}

export async function getWifi(id:number,userId:number) {
    return await prisma.wifi.findFirst({where:{id, userId}})
}

export async function deleteWifi(id:number) {
    return await prisma.wifi.delete({where:{id}})
}