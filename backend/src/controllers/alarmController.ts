import { Request, Response } from 'express';
import { createAlarm, deleteAlarm, listAlarms, updateAlarm } from '../services/alarmService';

export const getAlarms = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  res.json(await listAlarms(userId));
};

export const postAlarm = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  const { mantraId, hour, minute, repeatDays, enabled } = req.body as {
    mantraId: string;
    hour: number;
    minute: number;
    repeatDays: number[];
    enabled: boolean;
  };

  const alarm = await createAlarm({ userId, mantraId, hour, minute, repeatDays, enabled });
  res.status(201).json(alarm);
};

export const patchAlarm = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  const updated = await updateAlarm(userId, req.params.id, req.body as { mantraId?: string; hour?: number; minute?: number; repeatDays?: number[]; enabled?: boolean });
  res.json(updated);
};

export const removeAlarm = async (req: Request, res: Response): Promise<void> => {
  await deleteAlarm(req.user!.userId, req.params.id);
  res.status(204).send();
};
