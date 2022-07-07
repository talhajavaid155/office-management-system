const asyncHandler = require("express-async-handler");
// const db = require("../db.config");
const db = require("../models");
const Employee = db.employee;
const { sign, verify } = require("jsonwebtoken");
const createTokens = (user) => {
  const payload = {
    username: user.userName,
    id: user.id,
  };
  const accessToken = sign(payload, "talha", {
    expiresIn: 31556926, // 1 year in seconds
  });
  return accessToken;
};

//middleware (auth)
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verify(token, "talha");
      console.log(
        "🚀 ~ file: jwt.js ~ line 27 ~ validateToken ~ decoded",
        decoded
      );

      // req.user = await Employee.findById(decoded.id).select('-password')
      req.user = await Employee.findByPk(decoded.id);

      // console.log(decoded);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
  next();
  // const accessToken = req.cookies["access-token"];
  // if (!accessToken)
  //   return res.status(400).json({ error: "User not Authenticated" });

  // try {
  //   const validToken = verify(accessToken, "talha");
  //   if (validToken) {
  //     req.authenticated = true; // we can create variable by req.variable
  //     return next(); // move frwrd to our req
  //   }
  // } catch (err) {
  //   return res.status(400).json({ error: err });
  // }
});

module.exports = { createTokens, validateToken };
