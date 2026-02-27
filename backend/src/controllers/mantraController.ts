import { Request, Response } from 'express';
import { getMantraById, listMantras } from '../services/mantraService';

export const getMantras = async (_req: Request, res: Response): Promise<void> => {
  const mantras = await listMantras();
  res.json(mantras);
};

export const getMantra = async (req: Request, res: Response): Promise<void> => {
  const mantra = await getMantraById(req.params.id);
  res.json(mantra);
};
