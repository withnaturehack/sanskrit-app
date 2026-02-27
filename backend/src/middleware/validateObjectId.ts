import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError';

export const validateObjectId = (paramName: string) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const value = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new ApiError(400, `Invalid ${paramName}`);
    }

    next();
  };
