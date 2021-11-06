require('dotenv').config();
const env = process.env;
const config = {
  mongoURI: env.MONGO_URI,
  mongoPORT: env.MONGO_PORT,
  jwtSecret: env.JWT_SECRET,
  PORT: env.PORT
};
module.exports = config;