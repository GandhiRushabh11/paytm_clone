const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id);
    next();
  } catch (error) {
    return next(
      res.json({
        success: false,
        message: "Not authorized to access this route",
      })
    );
  }
};

module.exports = protect;
