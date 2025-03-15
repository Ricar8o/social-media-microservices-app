import { Router } from 'express';
import * as usersController from '../controllers/users.controller';

const router = Router();

router.get('/profile', usersController.getUserProfile);

export default router;
