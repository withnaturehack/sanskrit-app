import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Unauthorized');
  }

  const token = header.replace('Bearer ', '');
  req.user = jwt.verify(token, env.jwtSecret) as { userId: string };
  next();
};
