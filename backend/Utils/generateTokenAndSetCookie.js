import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // prevents XSS
    secure: process.env.NODE_ENV === "production", // HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
    // "none" in prod (because frontend + backend are usually on different domains)
    // "lax" in dev (so localhost:5173 → localhost:5000 works)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
