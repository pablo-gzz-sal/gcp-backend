import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT tokens in request headers
 * Checks for Bearer token in Authorization header and validates it
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns Response with 401/403 status on error, or calls next() on success
 * 
 * Error cases:
 * - 401: Missing/invalid Authorization header format
 * - 401: Missing token after "Bearer" prefix
 * - 403: Token verification failed (expired/invalid signature)
 */

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

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
    (req as any).user  = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
