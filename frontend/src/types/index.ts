export interface User {
  _id: string;
  name: string;
  email: string;
  streakCount: number;
}

export interface Mantra {
  _id: string;
  title: string;
  text: string;
  transliteration: string;
  meaning: string;
  audioUrl?: string;
  category: string;
}

export interface Book {
  _id: string;
  title: string;
  description: string;
}

export interface Chapter {
  _id: string;
  chapterNumber: number;
  title: string;
}

export interface Verse {
  _id: string;
  verseNumber: number;
  text: string;
  meaning: string;
}

export interface Alarm {
  _id: string;
  mantraId: string;
  hour: number;
  minute: number;
  repeatDays: number[];
  enabled: boolean;
}

export interface AlarmInput {
  mantraId: string;
  hour: number;
  minute: number;
  repeatDays: number[];
  enabled: boolean;
}

export interface DashboardStats {
  totalChants: number;
  streak: number;
}

export interface DashboardDetails extends DashboardStats {
  weekly: Array<{ date: string; count: number }>;
  topMantras: Array<{ mantraId: string; title: string; count: number }>;
}
