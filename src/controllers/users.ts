import express from 'express';

import {deleteUserById, getUserById, getUsers} from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const users = await getUsers();

        return res.status(200).json(users);

    }
    catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { id } = req.params;
        const deleteUser = await deleteUserById(id);
        return res.status(200).json(deleteUser);
    }
    catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { id } = req.params;
        const { username } = req.body;
        
        if(!username){
            return res.sendStatus(400);
        }

        const user = await getUserById(id);
        user.username = username;
        user.save();
        return res.status(200).json(user).end();
    }
    catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
}