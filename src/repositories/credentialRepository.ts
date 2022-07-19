import prisma from "../config/database.js";
import { CreateCredentialData } from "../schemas/credentialSchema.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.credential.findFirst({where: { title, userId}})}

export async function createCredential(userId: number, credential: CreateCredentialData) {
    return prisma.credential.create({data: {...credential, userId }})
}

export async function getCredentials(userId:number) {
    return await prisma.credential.findMany({where:{userId}})
}

export async function getCredential(id:number) {
    return await prisma.credential.findFirst({where:{id}})
}

export async function deleteCredential(id:number) {
    return await prisma.credential.delete({where:{id}})
}