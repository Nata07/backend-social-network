import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { authRouter } from './routes/auth.routes';
import { postRouter } from './routes/post.routes';
import { likeRouter } from './routes/like.routes';
import { commentRouter } from './routes/comment.routes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api', likeRouter);
app.use('/api/comments', commentRouter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export { app, prisma };
