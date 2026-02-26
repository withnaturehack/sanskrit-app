import dotenv from 'dotenv';

dotenv.config();

const requiredKeys = ['PORT', 'MONGODB_URI', 'JWT_SECRET'] as const;

requiredKeys.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
});

export const env = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d'
};
