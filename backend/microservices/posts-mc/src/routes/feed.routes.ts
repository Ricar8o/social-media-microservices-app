import { Router } from 'express';
import * as postsController from '../controllers/posts.controller';

const router = Router();

router.get('/', postsController.getFeed);

export default router;