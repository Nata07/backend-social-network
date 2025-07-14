import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service';

const commentService = new CommentService();

export class CommentController {
  async create(req: Request, res: Response) {
    try {
      const { content, parentId } = req.body;
      const { postId } = req.params;
      const userId = req.userId!;

      if (!content) {
        return res.status(400).json({ error: 'Conteúdo é obrigatório' });
      }

      const comment = await commentService.createComment({
        content,
        postId: Number(postId),
        authorId: userId,
        parentId: parentId ? Number(parentId) : undefined
      });

      return res.status(201).json(comment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const { parentId } = req.query;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await commentService.getComments(
        Number(postId),
        page,
        limit,
        parentId ? Number(parentId) : undefined
      );

      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.userId!;

      if (!content) {
        return res.status(400).json({ error: 'Conteúdo é obrigatório' });
      }

      const comment = await commentService.updateComment(Number(id), userId, { content });
      return res.json(comment);
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
      const userId = req.userId!;

      await commentService.deleteComment(Number(id), userId);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getReplies(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await commentService.getReplies(Number(commentId), page, limit);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
