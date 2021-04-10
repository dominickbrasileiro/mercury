export default {
  hashSalt: 12,
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  refreshTokenExpirationDays: 30,
  accessTokenExpirationMinutes: 15,
};
