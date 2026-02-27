import dotenv from 'dotenv';

dotenv.config();

const getString = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }

  return value;
};

const getNumber = (key: string, fallback: number): number => {
  const value = process.env[key] ?? String(fallback);
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid number env var: ${key}`);
  }

  return parsed;
};

export const env = {
  port: getNumber('PORT', 4000),
  mongoUri: getString('MONGODB_URI', 'mongodb://127.0.0.1:27017/vedamitra'),
  jwtSecret: getString('JWT_SECRET', 'vedamitra-dev-secret'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d'
};
