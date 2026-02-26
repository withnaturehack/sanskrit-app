import mongoose, { Document, Schema } from 'mongoose';

export interface IMantra extends Document {
  title: string;
  text: string;
  transliteration: string;
  meaning: string;
  audioUrl?: string;
  category: string;
}

const MantraSchema = new Schema<IMantra>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    transliteration: { type: String, required: true },
    meaning: { type: String, required: true },
    audioUrl: { type: String },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

export const Mantra = mongoose.model<IMantra>('Mantra', MantraSchema);
