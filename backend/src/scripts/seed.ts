import { connectDB } from '../config/db';
import { Alarm } from '../models/Alarm';
import { Book, Chapter, Verse } from '../models/SacredText';
import { Mantra } from '../models/Mantra';
import { Stats } from '../models/Stats';
import { User } from '../models/User';

const run = async (): Promise<void> => {
  await connectDB();

  await Promise.all([Alarm.deleteMany({}), Stats.deleteMany({}), User.deleteMany({}), Verse.deleteMany({}), Chapter.deleteMany({}), Book.deleteMany({}), Mantra.deleteMany({})]);

  const mantras = await Mantra.insertMany([
    {
      title: 'Om Namah Shivaya',
      text: 'ॐ नमः शिवाय',
      transliteration: 'Om Namah Shivaya',
      meaning: 'I bow to Shiva, the auspicious one.',
      category: 'Shiva'
    },
    {
      title: 'Gayatri Mantra',
      text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं...',
      transliteration: 'Om Bhur Bhuvah Svah...',
      meaning: 'A prayer for enlightenment and wisdom.',
      category: 'Vedic'
    }
  ]);

  const gita = await Book.create({ title: 'Bhagavad Gita', description: 'Dialogue between Krishna and Arjuna.' });
  const ramayana = await Book.create({ title: 'Ramayana', description: 'Epic of Lord Rama.' });

  const [gitaCh1, gitaCh2, ramCh1] = await Chapter.insertMany([
    { bookId: gita._id, chapterNumber: 1, title: 'Arjuna Vishada Yoga' },
    { bookId: gita._id, chapterNumber: 2, title: 'Sankhya Yoga' },
    { bookId: ramayana._id, chapterNumber: 1, title: 'Bala Kanda' }
  ]);

  await Verse.insertMany([
    {
      chapterId: gitaCh1._id,
      verseNumber: 1,
      text: 'धृतराष्ट्र उवाच धर्मक्षेत्रे कुरुक्षेत्रे...',
      transliteration: 'Dhritarashtra uvacha dharmakshetre kurukshetre...',
      meaning: 'Dhritarashtra said: On the field of dharma, Kurukshetra...'
    },
    {
      chapterId: gitaCh2._id,
      verseNumber: 47,
      text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
      transliteration: 'Karmanye vadhikaraste ma phaleshu kadachana',
      meaning: 'You have a right to action alone, never to its fruits.'
    },
    {
      chapterId: ramCh1._id,
      verseNumber: 1,
      text: 'तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम्',
      transliteration: 'Tapahsvadhyaya niratam tapasvi vagvidam varam',
      meaning: 'Absorbed in penance and study, foremost among eloquent sages.'
    }
  ]);

  console.log(`Seed complete. Mantras: ${mantras.length}`);
  process.exit(0);
};

run().catch((error: Error) => {
  console.error(error);
  process.exit(1);
});
