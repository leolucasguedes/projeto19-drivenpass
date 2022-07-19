import { Request, Response } from "express";
import { User } from "@prisma/client";
import * as CS from '../services/credentialService.js';

import { CreateCredentialData } from "../schemas/credentialSchema.js";

export async function createCredential(req:Request, res:Response) {
    const credential : CreateCredentialData = req.body;
    const user: User = res.locals.user;

    await CS.createNewCredential(user, credential);
    res.sendStatus(201);
}

export async function getUserCredentials(req:Request, res:Response) {
    const user: User = res.locals.user;

    const credentials = await CS.getAllCredentials(user.id);

    res.status(200).send(credentials);
}

export async function getCredentialById(req:Request, res:Response) {
    const { id } = req.params;
    const user: User = res.locals.user;

    const credential = await CS.getOneCredential(Number(id), user.id);

    res.status(200).send(credential);
}

export async function deleteCredential(req:Request, res:Response){
    const { id } = req.params;
    const user: User = res.locals.user;

    await CS.deleteOneCredential(Number(id), user.id);

    res.sendStatus(200);
}