import { Request, Response } from "express";
import { User } from "@prisma/client";
import * as CS from '../services/credentialService.js';

import { CreateCredentialData } from "../schemas/credentialSchema.js";

export async function createCredential(req:Request, res:Response) {
    const {title, url, username, password}: { title: string; url: string; username : string; password: string } = req.body;
    const user: User = res.locals.user;
    const userId = user.id;

    const credentialInfo: CreateCredentialData = {title, url, username, password, userId};

    await CS.createCredential(credentialInfo);
    res.sendStatus(201);
}

export async function getUserCredentials(req:Request, res:Response) {
    const user: User = res.locals.user;
    const userId = user.id;

    const credentials = await CS.getAllCredentials(Number(userId));

    res.status(200).send(credentials);
}

export async function getCredentialById(req:Request, res:Response) {
    const { id } = req.params;
    const user: User = res.locals.user;
    const userId = user.id;

    const credential = await CS.getCredentialById(Number(id), Number(userId));

    res.status(200).send(credential);
}

export async function deleteCredential(req:Request, res:Response){
    const { id } = req.params;
    const user: User = res.locals.user;
    const userId = user.id;

    await CS.deleteCredential(Number(id), Number(userId));

    res.sendStatus(200);
}