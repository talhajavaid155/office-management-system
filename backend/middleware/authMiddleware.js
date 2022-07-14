const asyncHandler = require("express-async-handler");
// const db = require("../db.config");
const db = require("../models");
const User = db.user;
const { sign, verify } = require("jsonwebtoken");

//middleware (auth)
const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = verify(token, "talha");

      req.user = await User.findByPk(decoded.id, {
        raw: true,
        nest: true,
        include: ["role"],
      });

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  try {
    if (req.user?.role?.roleName !== "Admin") {
      throw new Error("Not Authorized, token failessssd");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not Authorized as Admin");
  }
};
module.exports = { validateToken, admin };
