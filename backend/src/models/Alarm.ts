import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IAlarm extends Document {
  userId: Types.ObjectId;
  mantraId: Types.ObjectId;
  hour: number;
  minute: number;
  enabled: boolean;
  repeatDays: number[];
}

const AlarmSchema = new Schema<IAlarm>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mantraId: { type: Schema.Types.ObjectId, ref: 'Mantra', required: true },
    hour: { type: Number, required: true, min: 0, max: 23 },
    minute: { type: Number, required: true, min: 0, max: 59 },
    enabled: { type: Boolean, default: true },
    repeatDays: { type: [Number], default: [] }
  },
  { timestamps: true }
);

export const Alarm = mongoose.model<IAlarm>('Alarm', AlarmSchema);
