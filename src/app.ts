import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { authRouter } from './routes/auth.routes';
import { postRouter } from './routes/post.routes';
import { likeRouter } from './routes/like.routes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api', likeRouter);

export { app, prisma };
