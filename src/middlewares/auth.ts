import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
