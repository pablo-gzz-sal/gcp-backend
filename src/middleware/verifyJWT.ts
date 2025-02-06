import jwt from "jsonwebtoken";

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization || req.header.Authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid authorization header" });

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
