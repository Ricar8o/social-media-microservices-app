import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/authorizer.middleware';
import * as postsService from '../services/posts.service';
import * as likesService from '../services/likes.service';

export async function likePost(req: Request, res: Response) {
  try {
    const postId = +req.params.id;
    await postsService.getPost(postId);
    const customReq = req as CustomRequest;
    const userId = (customReq.decodedToken as any).id;
    await likesService.likePost(postId, userId);
    res.status(200).send({
      message: 'Post liked successfully',
    });
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to like post', error: error.message });
  }
}

export async function unlikePost(req: Request, res: Response) {
  try {
    const postId = +req.params.id;
    await postsService.getPost(postId);
    const customReq = req as CustomRequest;
    const userId = (customReq.decodedToken as any).id;
    await likesService.unlikePost(postId, userId);
    res.status(200).send({
      message: 'Post unliked successfully',
    });
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to unlike post', error: error.message });
  }
}