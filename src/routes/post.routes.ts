import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { authMiddleware } from '../middlewares/auth';

const postRouter = Router();
const postController = new PostController();

postRouter.use(authMiddleware); // Todas as rotas precisam de autenticação

postRouter.post('/', postController.create);
postRouter.get('/', postController.list);
postRouter.get('/:id', postController.show);
postRouter.put('/:id', postController.update);
postRouter.delete('/:id', postController.delete);
postRouter.get('/user/:userId', postController.listUserPosts);

export { postRouter };
