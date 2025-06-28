const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token) {
      throw new Error("Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ isSuccess: false, message: error.message });
  }
};

module.exports = authMiddleware;
