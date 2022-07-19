import prisma from "../config/database.js";
import { CreateNoteData } from "../schemas/noteSchema.js";

export async function findByTitleAndUserId(title:string, userId:number) {
    return await prisma.note.findFirst({where: { title,userId}})}

export async function createNote(userId: number, note: CreateNoteData) {
    return prisma.note.create({data: {...note, userId }})
}

export async function getNotes(userId:number) {
    return await prisma.note.findMany({where:{userId}})
}

export async function getNote(id:number,userId:number) {
    return await prisma.note.findFirst({where:{id, userId}})
}

export async function deleteNote(id:number) {
    return await prisma.note.delete({where:{id}})
}