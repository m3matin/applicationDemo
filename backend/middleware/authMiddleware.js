const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Check if token is not provided in the header
  if (!token) {
    return res.status(401).json({
      status: false,
      message: "No token, authorization denied.",
    });
  }

  const bearerToken = token.split(" ")[1];
  if (!bearerToken) {
    return res.status(401).json({
      status: false,
      message: "Invalid token format. Expected Bearer token.",
    });
  }

  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Token is not valid or has expired.",
    });
  }
};

module.exports = authMiddleware;
