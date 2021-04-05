module.exports = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  migrations: [
    process.env.NODE_ENV === 'production'
      ? './dist/database/migrations/*.js'
      : './src/database/migrations/*.ts',
  ],
  entities: [
    process.env.NODE_ENV === 'production'
      ? './dist/**/entities/*.js'
      : './src/**/entities/*.ts',
  ],
  cli: {
    migrationsDir:
      process.env.NODE_ENV === 'production'
        ? './dist/database/migrations'
        : './src/database/migrations',
  },
};
