import mongoose from 'mongoose';
import { Stats } from '../models/Stats';
import { User } from '../models/User';

const getDateKey = (date: Date = new Date()): string => date.toISOString().split('T')[0];

const dayDiff = (a: Date, b: Date): number => {
  const utcA = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const utcB = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.round((utcA - utcB) / (1000 * 60 * 60 * 24));
};

export const incrementChantCount = async (userId: string, mantraId: string): Promise<void> => {
  const date = getDateKey();

  await Stats.findOneAndUpdate({ userId, mantraId, date }, { $inc: { count: 1 } }, { upsert: true, new: true });

  const user = await User.findById(userId);
  if (!user) {
    return;
  }

  const today = new Date(date);
  const lastDate = user.lastChantDate ? new Date(getDateKey(user.lastChantDate)) : undefined;

  if (!lastDate) {
    user.streakCount = 1;
  } else {
    const diffDays = dayDiff(today, lastDate);
    user.streakCount = diffDays === 1 ? user.streakCount + 1 : diffDays === 0 ? user.streakCount : 1;
  }

  user.lastChantDate = new Date();
  await user.save();
};

export const getDashboardStats = async (userId: string): Promise<{ totalChants: number; streak: number }> => {
  const records = await Stats.find({ userId });
  const totalChants = records.reduce((sum, record) => sum + record.count, 0);
  const user = await User.findById(userId);

  return { totalChants, streak: user?.streakCount ?? 0 };
};

export interface ChartPoint {
  date: string;
  count: number;
}

export interface DashboardDetails {
  totalChants: number;
  streak: number;
  weekly: ChartPoint[];
  topMantras: Array<{ mantraId: string; title: string; count: number }>;
}

export const getDashboardDetails = async (userId: string): Promise<DashboardDetails> => {
  const objectUserId = new mongoose.Types.ObjectId(userId);

  const [{ totalChants, streak }, weeklyRaw, topRaw] = await Promise.all([
    getDashboardStats(userId),
    Stats.aggregate<{ _id: string; count: number }>([
      { $match: { userId: objectUserId } },
      { $group: { _id: '$date', count: { $sum: '$count' } } },
      { $sort: { _id: 1 } }
    ]),
    Stats.aggregate<{ mantraId: string; count: number; title: string }>([
      { $match: { userId: objectUserId } },
      { $group: { _id: '$mantraId', count: { $sum: '$count' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'mantras',
          localField: '_id',
          foreignField: '_id',
          as: 'mantra'
        }
      },
      { $unwind: '$mantra' },
      {
        $project: {
          _id: 0,
          mantraId: { $toString: '$_id' },
          count: 1,
          title: '$mantra.title'
        }
      }
    ])
  ]);

  const today = new Date();
  const weeklyMap = new Map(weeklyRaw.map((entry) => [entry._id, entry.count]));
  const weekly: ChartPoint[] = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (6 - index));
    const key = getDateKey(date);

    return {
      date: key,
      count: weeklyMap.get(key) ?? 0
    };
  });

  return { totalChants, streak, weekly, topMantras: topRaw };
};
