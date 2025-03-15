import { Request, Response } from 'express';
import * as postsService from '../services/posts.service';
import { CustomRequest } from '../middlewares/authorizer.middleware';

export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await postsService.getPosts();
    res.status(200).send(posts);
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to get posts', error: error.message });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const customReq = req as CustomRequest;
    const userId = (customReq.decodedToken as any).id;
    const { content } = req.body;

    if (!content) {
      throw new Error('Content is required');
    }
    const post = await postsService.createPost(content, userId);
    res.status(201).send(post);
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to create post', error: error.message });
  }
}