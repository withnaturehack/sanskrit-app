import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { ApiError } from '../utils/ApiError';

export const validate = (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ApiError(400, result.error.issues.map((issue) => issue.message).join(', '));
    }

    req.body = result.data;
    next();
  };
