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
const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated" });

  try {
    const validToken = verify(accessToken, "talha");
    if (validToken) {
      req.authenticated = true; // we can create variable by req.variable
      return next(); // move frwrd to our req
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
