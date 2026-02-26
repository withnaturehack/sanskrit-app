import { app } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const bootstrap = async (): Promise<void> => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Vedamitra backend running on port ${env.port}`);
  });
};

bootstrap().catch((error: Error) => {
  console.error(error);
  process.exit(1);
});
