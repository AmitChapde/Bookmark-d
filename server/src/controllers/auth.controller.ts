import { Request, Response, NextFunction } from "express";
import { register, login } from "../services/auth.service";
import { LoginInput, RegisterInput } from "../types/user.types";
import User from "../models/user.model";
import { promisify } from "util";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const registerController = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
): Promise<void> => {
  try {
    const newUser = await register(req.body);
    console.log(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  }
};

const loginController = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
): Promise<void> => {
  try {
    const user = await login(req.body);
    res.status(200).json({
      status: "success",
      data: {
        token: user.token,
        user: user.user,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  }
};

const protectController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token;
  try {
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({ message: "You are not logged in." });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      res.status(401).json({ message: "The user no longer exists." });
      return;
    }

    req.user = freshUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token" });
    return;
  }
};

export { loginController, registerController, protectController };
