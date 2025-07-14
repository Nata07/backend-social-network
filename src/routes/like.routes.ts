import { Router } from 'express';
import { LikeController } from '../controllers/like.controller';
import { authMiddleware } from '../middlewares/auth';

const likeRouter = Router();
const likeController = new LikeController();

likeRouter.use(authMiddleware);

likeRouter.post('/posts/:postId/like', likeController.toggleLike);
likeRouter.get('/posts/:postId/likes', likeController.getLikes);
likeRouter.get('/posts/:postId/like-status', likeController.checkLikeStatus);

export { likeRouter };
