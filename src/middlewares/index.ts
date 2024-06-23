import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

interface CurrentUser {
    _id?: object;
    username?: string;
    email?: string;
    __v?: number;
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { id } = req.params;
        const currentUserId = get(req, 'identity') as CurrentUser | undefined;

        if(!currentUserId){
            return res.sendStatus(403);
        }

        if(currentUserId._id.toString() !== id){
            return res.sendStatus(403);
        }        

        next();
    }   
    catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
}


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['API-USER-AUTH']
        
        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req,{identity: existingUser})
        return next();
    }
    catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
}