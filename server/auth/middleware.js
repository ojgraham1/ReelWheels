const jwt = require("jsonwebtoken");
const process = require("process");
const jwtSecret = "shh"; 

const veryTokey = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.sendStatus(401);
    console.log(token, jwtSecret)
      jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user.data;
        next();
      });
    };
    
    const isAdmin = (req, res, next) => {
        console.log("hi")
        console.log(req.user)
        if (req.user && req.user.isadmin ===true) {
          next(); 
        } else {
          res.sendStatus(403); 
        }
      };

      module.exports = { veryTokey, isAdmin };
  