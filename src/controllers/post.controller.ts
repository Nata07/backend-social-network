import { Request, Response } from 'express';
import { PostService } from '../services/post.service';

const postService = new PostService();

export class PostController {
  async create(req: Request, res: Response) {
    try {
      const { content } = req.body;
      const authorId = req.userId!;

      if (!content) {
        return res.status(400).json({ error: 'Conteúdo é obrigatório' });
      }

      const post = await postService.createPost({ content, authorId });
      return res.status(201).json(post);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await postService.getPosts(page, limit);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await postService.getPostById(Number(id));
      return res.json(post);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const authorId = req.userId!;

      if (!content) {
        return res.status(400).json({ error: 'Conteúdo é obrigatório' });
      }

      const post = await postService.updatePost(Number(id), authorId, { content });
      return res.json(post);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const authorId = req.userId!;

      await postService.deletePost(Number(id), authorId);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async listUserPosts(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await postService.getUserPosts(Number(userId), page, limit);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
