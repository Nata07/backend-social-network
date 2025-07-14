import { Request, Response } from 'express';
import { LikeService } from '../services/like.service';

const likeService = new LikeService();

export class LikeController {
  async toggleLike(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const userId = req.userId!;

      const result = await likeService.toggleLike(Number(postId), userId);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getLikes(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await likeService.getLikes(Number(postId), page, limit);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async checkLikeStatus(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const userId = req.userId!;

      const result = await likeService.checkLikeStatus(Number(postId), userId);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
