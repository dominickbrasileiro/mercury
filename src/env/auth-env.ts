export default {
  accessTokenExpirationMinutes: 15,
  refreshTokenExpirationDays: 180,

  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  hashSalt: 12,
};
