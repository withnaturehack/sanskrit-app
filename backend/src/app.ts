import cors from 'cors';
import express from 'express';
import alarmRoutes from './routes/alarmRoutes';
import authRoutes from './routes/authRoutes';
import mantraRoutes from './routes/mantraRoutes';
import statsRoutes from './routes/statsRoutes';
import textRoutes from './routes/textRoutes';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/mantras', mantraRoutes);
app.use('/api/texts', textRoutes);
app.use('/api/alarms', alarmRoutes);
app.use('/api/stats', statsRoutes);

app.use(errorHandler);
