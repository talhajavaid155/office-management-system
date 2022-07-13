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
    // console.log(
    //   "🚀 ~ file: authMiddleware.js ~ line 13 ~ validateToken ~ req.headers.authorization",
    //   req.headers.authorization
    // );

    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = verify(token, "talha");

      req.user = await User.findByPk(decoded.id);

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

const admin = asyncHandler(async (req, res, next) => {
  try {
    console.log(
      "🚀 ~ file: authMiddleware.js ~ line 42 ~ admin ~ req",
      req.user
    );
    const user = await User.findByPk(req.user.id, {
      include: ["role"],
    }).json();
    console.log(
      "🚀 ~ file: authMiddleware.js ~ line 46 ~ admin ~ user",
      user.role.roleName
    );

    if (user?.role?.roleName !== "Admin") {
      throw new Error("Not Authorized, token failessssd");
    }
    // console.log(decoded);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not Authorized as Admin");
  }
});
module.exports = { validateToken, admin };
