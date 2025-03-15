import { Router } from 'express';
import * as postsController from '../controllers/posts.controller';

const router = Router();

router.get('/', postsController.getPosts);
router.post('/', postsController.createPost);
// router.get('/:id', postsController.getPost);
// router.put('/:id', postsController.updatePost);
// router.delete('/:id', postsController.deletePost);
// router.post('/:id/like', postsController.likePost);
// router.post('/:id/unlike', postsController.unlikePost);

export default router;