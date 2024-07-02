const jwt = require("jsonwebtoken");
const process = require("process");
const jwtSecret = "shh"; 

const veryTokey = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.sendStatus(403);
      }
  
      req.user = decodedToken.data;
      next();
    });
  };

  const isAdmin = (req, res, next) => {
    console.log(req.user)
    if (req.user && req.user.isadmin ===true) {
      next(); 
    } else {
      res.sendStatus(403); 
    }
  };

      module.exports = { veryTokey, isAdmin };
  