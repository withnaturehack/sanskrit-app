import axios from 'axios';
import { Alarm, AlarmInput, Book, Chapter, DashboardDetails, DashboardStats, Mantra, User, Verse } from '../types';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api'
});

export const setAuthToken = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const registerApi = async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data as { user: User; token: string };
};

export const loginApi = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  const { data } = await api.post('/auth/login', { email, password });
  return data as { user: User; token: string };
};

export const fetchMantras = async (): Promise<Mantra[]> => (await api.get('/mantras')).data as Mantra[];
export const fetchMantra = async (id: string): Promise<Mantra> => (await api.get(`/mantras/${id}`)).data as Mantra;

export const fetchBooks = async (): Promise<Book[]> => (await api.get('/texts/books')).data as Book[];
export const fetchChapters = async (bookId: string): Promise<Chapter[]> => (await api.get(`/texts/books/${bookId}/chapters`)).data as Chapter[];
export const fetchVerses = async (chapterId: string): Promise<Verse[]> => (await api.get(`/texts/chapters/${chapterId}/verses`)).data as Verse[];

export const fetchAlarms = async (): Promise<Alarm[]> => (await api.get('/alarms')).data as Alarm[];
export const createAlarmApi = async (payload: AlarmInput): Promise<void> => {
  await api.post('/alarms', payload);
};
export const deleteAlarmApi = async (alarmId: string): Promise<void> => {
  await api.delete(`/alarms/${alarmId}`);
};

export const recordChantApi = async (mantraId: string): Promise<void> => {
  await api.post('/stats/chant', { mantraId });
};
export const dashboardApi = async (): Promise<DashboardStats> => (await api.get('/stats/dashboard')).data as DashboardStats;
export const dashboardDetailsApi = async (): Promise<DashboardDetails> => (await api.get('/stats/dashboard/details')).data as DashboardDetails;

export default api;
