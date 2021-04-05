import { Connection, createConnection } from 'typeorm';

async function connectToDatabase(): Promise<Connection> {
  const connection = await createConnection();
  return connection;
}

export { connectToDatabase };
