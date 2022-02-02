const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "Authentication invalid" });
  }

  try {
    const payload = jwt.verify(authHeader, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Authentication invalid" });
  }
};

module.exports = auth;
