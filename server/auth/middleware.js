const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwtSecret = process.env.JWTSEC

const veryTokey = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      return res.sendStatus(403);
    }

    if (decodedToken && decodedToken.data) {
      req.user = decodedToken.data;
    }
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isadmin === true) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = { veryTokey, isAdmin };
