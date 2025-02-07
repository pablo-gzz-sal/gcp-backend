import { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthService from "../services/auth.service";
import { Request, Response } from "express";


/**
 * Handles user login and registration
 * @param req Express request containing email and password in body
 * @param res Express response
 * @returns JSON response with auth token or error message
 * @throws 400 if email/password missing
 * @throws 401 if password doesn't match
 * @throws 500 if user creation fails
 */
export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body as IUser;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  let foundUser = await AuthService.findUser(email);

  if (!foundUser) {
    foundUser = await AuthService.createUser(email, password)
  }

  if (!foundUser) {
    return res.status(500).json({ message: "Error creating user" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign(
    { email: foundUser.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return res.json({ token, message: "User Found" });
};

/**
 * Protected route handler requiring valid JWT
 * @param req Express request with user data from JWT middleware
 * @param res Express response
 * @returns JSON response with user data from JWT
 */
export const protectedRoute = (req: Request, res: Response) => {
  res.json({ 
    message: 'Protected data', 
    data: 'Secret content',
    user: (req as any).user 
  });
};
