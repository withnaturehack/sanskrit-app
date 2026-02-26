import { Mantra, IMantra } from '../models/Mantra';
import { ApiError } from '../utils/ApiError';

export const listMantras = async (): Promise<IMantra[]> => Mantra.find().sort({ createdAt: -1 });

export const getMantraById = async (id: string): Promise<IMantra> => {
  const mantra = await Mantra.findById(id);
  if (!mantra) {
    throw new ApiError(404, 'Mantra not found');
  }

  return mantra;
};
