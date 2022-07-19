import prisma from "../config/database.js";
import { CreateNoteData } from "../schemas/noteSchema.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.note.findFirst({where: { title,userId}})}

export async function createSafeNote(data:CreateNoteData) {
    return prisma.note.create({data})
}

export async function getSafeNotes(userId:number) {
    return await prisma.note.findMany({where:{userId}})
}

export async function getNote(id:number,userId:number) {
    return await prisma.note.findFirst({where:{id, userId}})
}

export async function deleteSafeNote(id:number) {
    return await prisma.note.delete({where:{id}})
}