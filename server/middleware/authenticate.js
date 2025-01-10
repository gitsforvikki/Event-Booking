const jwt = require("jsonwebtoken");

const authenticateUser = async (request, response, next) => {
  const token = request.header("x-auth-token");
  if (!token) {
    return response.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.jwt_secret_key);
    request.user = decoded.user;
    next();
  } catch (err) {
    response.status(401).json({ msg: "Token is not validd" });
  }
};

module.exports = authenticateUser;
