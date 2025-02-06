import User, { IUser } from "../models/User";
import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthService from "../services/auth.service";

export const registerUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  const foundUser = await AuthService.findUser(email);
  if (foundUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = await AuthService.createUser(email, password);
  res.status(201).json({
    message: "User registered successfully",
    user: { email: newUser.email, password: newUser.password },
  });
};

export const handleLogin = async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = await AuthService.findUser(email);

  const match = await bcrypt.compare(password, foundUser.password);

  if (!foundUser || !match)
    return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign(
    { email: foundUser.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return res.json({ token, message: "User Found" });
};

export const protectedRoute = (req: any, res: any) => {
  res.json({ message: "This is a protected route", user: (req as any).user });
};
