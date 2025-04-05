import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const requireLogin = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res
      .status(400)
      .json({ error: "Not authenticated, please sign in!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "token is invalid, please sign in!" });
    }

    req.user = result;
    next();
  });
};
