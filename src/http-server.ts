import { app } from './app';
import { connectToDatabase } from './database';
import appEnv from './env/app-env';

(async () => {
  await connectToDatabase();
  console.log('🔷 Database connected');

  app.listen(appEnv.port, () => {
    console.log(`🔷 Server running at http://localhost:${appEnv.port}`);
  });
})();
