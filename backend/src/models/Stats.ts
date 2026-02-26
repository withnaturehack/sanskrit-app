import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IStats extends Document {
  userId: Types.ObjectId;
  mantraId: Types.ObjectId;
  count: number;
  date: string;
}

const StatsSchema = new Schema<IStats>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mantraId: { type: Schema.Types.ObjectId, ref: 'Mantra', required: true },
    count: { type: Number, required: true },
    date: { type: String, required: true }
  },
  { timestamps: true }
);

StatsSchema.index({ userId: 1, mantraId: 1, date: 1 }, { unique: true });

export const Stats = mongoose.model<IStats>('Stats', StatsSchema);
