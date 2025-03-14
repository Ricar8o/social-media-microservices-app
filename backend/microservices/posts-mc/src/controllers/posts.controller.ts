import { Request, Response } from 'express';
import * as postsService from '../services/posts.service';
import { CustomRequest } from '../middlewares/authorizer.middleware';
import { PostsQueryFilters } from '../services/posts.service';

export async function getPosts(req: Request, res: Response) {
  try {
    const customReq = req as CustomRequest;
    const userId = (customReq.decodedToken as any).id;
    const filters = req.query as PostsQueryFilters;
    const posts = await postsService.getPosts(userId, filters);
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
    const postResponse = await postsService.getPost(post.id, userId);
    res.status(201).send(postResponse);
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to create post', error: error.message });
  }
}

export async function getPost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const customReq = req as CustomRequest;
    const userId = (customReq.decodedToken as any).id;
    const post = await postsService.getPost(+id, userId);
    res.status(200).send(post);
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to get post', error: error.message });
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const customReq = req as CustomRequest;
    const userId = (customReq.decodedToken as any).id;
    const id = req.params.id;
    const { content } = req.body;

    if (!content) {
      throw new Error('Content is required');
    }
    const post = await postsService.getPost(+id, userId);

    if (post.author?.id !== userId) {
      throw new Error('You are not allowed to update this post');
    }

    await postsService.updatePost(+id, content);
    const updatedPost = await postsService.getPost(post.id, userId);
    res.status(200).send(updatedPost);
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to update post', error: error.message });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await postsService.deletePost(+id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to delete post', error: error.message });
  }
}

export async function getFeed(req: Request, res: Response) {
  try {
    const customReq = req as CustomRequest;
    const userId = (customReq.decodedToken as any).id;
    const filters = req.query as PostsQueryFilters;
    const posts = await postsService.getFeed(userId, filters);
    res.status(200).send(posts);
  } catch (error: any) {
    res.status(400).send({ message: 'Failed to get feed', error: error.message });
  }
}