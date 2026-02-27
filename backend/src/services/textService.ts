import { Book, Chapter, IBook, IChapter, IVerse, Verse } from '../models/SacredText';

export const listBooks = async (): Promise<IBook[]> => Book.find();
export const listChapters = async (bookId: string): Promise<IChapter[]> =>
  Chapter.find({ bookId }).sort({ chapterNumber: 1 });
export const listVerses = async (chapterId: string): Promise<IVerse[]> =>
  Verse.find({ chapterId }).sort({ verseNumber: 1 });
