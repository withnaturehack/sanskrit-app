import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IVerse extends Document {
  chapterId: Types.ObjectId;
  verseNumber: number;
  text: string;
  transliteration: string;
  meaning: string;
}

export interface IChapter extends Document {
  bookId: Types.ObjectId;
  chapterNumber: number;
  title: string;
}

export interface IBook extends Document {
  title: string;
  description: string;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true }
});

const ChapterSchema = new Schema<IChapter>({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  chapterNumber: { type: Number, required: true },
  title: { type: String, required: true }
});

const VerseSchema = new Schema<IVerse>({
  chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
  verseNumber: { type: Number, required: true },
  text: { type: String, required: true },
  transliteration: { type: String, required: true },
  meaning: { type: String, required: true }
});

export const Book = mongoose.model<IBook>('Book', BookSchema);
export const Chapter = mongoose.model<IChapter>('Chapter', ChapterSchema);
export const Verse = mongoose.model<IVerse>('Verse', VerseSchema);
