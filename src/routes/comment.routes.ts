import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { authMiddleware } from '../middlewares/auth';

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.use(authMiddleware);

// Rotas principais de comentários
commentRouter.post('/posts/:postId/comments', commentController.create);
commentRouter.get('/posts/:postId/comments', commentController.list);
commentRouter.put('/comments/:id', commentController.update);
commentRouter.delete('/comments/:id', commentController.delete);

// Rotas para respostas
commentRouter.get('/comments/:commentId/replies', commentController.getReplies);

export { commentRouter };
