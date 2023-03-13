const { verify } = require("jsonwebtoken");
require("dotenv/config");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authenticated");

  verify(token, process.env.KEY, (err, user) => {
    if (err) return res.status(403).json("Token Not Valid");
    req.user = user;

    next();
  });
};



const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Admin use only");
    }
  });
};

module.exports = { verifyToken,  verifyAdmin };
