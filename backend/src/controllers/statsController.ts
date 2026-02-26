import { Request, Response } from 'express';
import { getDashboardDetails, getDashboardStats, incrementChantCount } from '../services/statsService';

export const recordChant = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  const { mantraId } = req.body as { mantraId: string };
  await incrementChantCount(userId, mantraId);
  res.status(204).send();
};

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  const stats = await getDashboardStats(req.user!.userId);
  res.json(stats);
};

export const getDashboardDetailed = async (req: Request, res: Response): Promise<void> => {
  const stats = await getDashboardDetails(req.user!.userId);
  res.json(stats);
};
