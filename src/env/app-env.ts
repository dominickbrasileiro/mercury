export default {
  port: process.env.PORT || '4500',
  resetPasswordURL:
    process.env.RESET_PASSWORD_URL ||
    'http://localhost:3000/reset-password?token=',
};
