const jwt = require("jsonwebtoken");

const accessToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return accessToken;
};

const refreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
};

const VerifyAccessToken = (token) => {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decoded);
};

const VerifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  console.log(decoded);
};

module.exports = {
  accessToken,
  refreshToken,
  VerifyAccessToken,
  VerifyRefreshToken,
};
