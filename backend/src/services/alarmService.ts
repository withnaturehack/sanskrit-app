import { Alarm, IAlarm } from '../models/Alarm';
import { ApiError } from '../utils/ApiError';

interface AlarmPayload {
  userId: string;
  mantraId: string;
  hour: number;
  minute: number;
  repeatDays: number[];
  enabled: boolean;
}

export const listAlarms = async (userId: string): Promise<IAlarm[]> => Alarm.find({ userId }).sort({ hour: 1, minute: 1 });

export const createAlarm = async (payload: AlarmPayload): Promise<IAlarm> => Alarm.create(payload);

export const updateAlarm = async (userId: string, alarmId: string, payload: Partial<Omit<AlarmPayload, 'userId'>>): Promise<IAlarm> => {
  const alarm = await Alarm.findOneAndUpdate({ _id: alarmId, userId }, payload, { new: true });
  if (!alarm) {
    throw new ApiError(404, 'Alarm not found');
  }

  return alarm;
};

export const deleteAlarm = async (userId: string, alarmId: string): Promise<void> => {
  const deleted = await Alarm.findOneAndDelete({ _id: alarmId, userId });
  if (!deleted) {
    throw new ApiError(404, 'Alarm not found');
  }
};
