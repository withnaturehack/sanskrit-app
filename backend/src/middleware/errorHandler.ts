import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors).map((issue) => issue.message).join(', ');
    res.status(400).json({ message });
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: `Invalid ${err.path}` });
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    res.status(500).json({ message: err.message || 'Internal Server Error' });
    return;
  }

  res.status(500).json({ message: 'Internal Server Error' });
};
