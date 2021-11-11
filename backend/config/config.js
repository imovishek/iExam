require('dotenv').config();
const env = process.env;
const config = {
  mongoURI: env.MONGO_URI,
  mongoPORT: env.MONGO_PORT,
  jwtSecret: env.JWT_SECRET,
  PORT: env.PORT,
  SENDGRID_API_KEY: env.SENDGRID_API_KEY,
  SENGRID_SENDER_EMAIL: env.SENGRID_SENDER_EMAIL,
};
module.exports = config;