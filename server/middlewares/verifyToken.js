const config = require('../../config/config');
const jwt = require('jsonwebtoken');

const authURL = '/api/auth/login';
const forgotPassUrl = '/api/user/forgotPassword';
module.exports = (req, res, next) => {
  if (req.url === authURL) return next();
  if (req.url === forgotPassUrl) return next();
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}