import { Request, Response } from 'express';
import { listBooks, listChapters, listVerses } from '../services/textService';

export const getBooks = async (_req: Request, res: Response): Promise<void> => {
  res.json(await listBooks());
};

export const getChapters = async (req: Request, res: Response): Promise<void> => {
  res.json(await listChapters(req.params.bookId));
};

export const getVerses = async (req: Request, res: Response): Promise<void> => {
  res.json(await listVerses(req.params.chapterId));
};
