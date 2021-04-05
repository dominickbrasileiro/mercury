export default {
  hashSalt: 12,
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  jwtExpiresIn: '1d',
};
