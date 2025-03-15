import { CustomRequest } from "../middlewares/authorizer.middleware";
import { Request, Response } from 'express';
import * as usersService from "../services/users.service";


export async function getUsers(req: Request, res: Response) {
  try {
    const users = await usersService.getUsers();
    res.status(200).send(users);
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to get users', error: error.message });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = await usersService.getUser(+id);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to get user', error: error.message });
  }
}

export async function getUserProfile(req: Request, res: Response) {
  try {
    const customReq = req as CustomRequest;
    const id = (customReq.decodedToken as any).id;
    const user = await usersService.getUser(id);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to get user profile', error: error.message });
  }
}