const { sign } = require("jsonwebtoken");
const generateToken = (user) => {
  const payload = {
    username: user.userName,
    id: user.id,
  };
  const accessToken = sign(payload, "talha", {
    expiresIn: 31556926, // 1 year in seconds
  });
  return accessToken;
};

module.exports = { generateToken };
