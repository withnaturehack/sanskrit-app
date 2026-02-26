import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    res.status(500).json({ message: err.message || 'Internal Server Error' });
    return;
  }

  res.status(500).json({ message: 'Internal Server Error' });
};
