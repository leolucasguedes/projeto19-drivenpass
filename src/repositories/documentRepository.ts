import prisma from "../config/database.js";
import { CreateDocumentData } from "../schemas/documentSchema.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.document.findFirst({where: { title, userId}})}

export async function createDocument(userId: number, document: CreateDocumentData) {
    return prisma.document.create({data: {...document, userId }})
}

export async function getDocuments(userId:number) {
    return await prisma.document.findMany({where:{userId}})
}

export async function getDocument(id:number,userId:number) {
    return await prisma.document.findFirst({where:{id, userId}})
}

export async function deleteDocument(id:number) {
    return await prisma.document.delete({where:{id}})
}