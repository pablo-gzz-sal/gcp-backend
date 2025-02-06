import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { verifyJWT } from "../middleware/verifyJWT";
import {
  handleLogin,
  protectedRoute,
  registerUser,
} from "../controllers/authController";

router.post("/auth", handleLogin);
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

router.get("/protected", verifyJWT, protectedRoute);

export default router;
