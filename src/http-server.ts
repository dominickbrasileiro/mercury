import { app } from './app';
import { connectToDatabase } from './database';

(async () => {
  await connectToDatabase();
  console.log('🔷 Database connected');

  app.listen(4500, () => {
    console.log('🔷 Server running at http://localhost:4500');
  });
})();
