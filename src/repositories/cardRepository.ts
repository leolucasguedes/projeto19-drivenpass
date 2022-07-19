import prisma from "../config/database.js";
import { CreateCardData } from "../schemas/cardSchema.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.card.findFirst({where: { title, userId}})}

export async function createCard(userId: number, card: CreateCardData) {
    return prisma.card.create({data: {...card, userId }})
}

export async function getCards(userId:number) {
    return await prisma.card.findMany({where:{userId}})
}

export async function getCard(id:number,userId:number) {
    return await prisma.card.findFirst({where:{id, userId}})
}

export async function deleteCard(id:number) {
    return await prisma.card.delete({where:{id}})
}