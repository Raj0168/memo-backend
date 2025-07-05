import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist, please create an account." });
    }

    if (!(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ message: "Invalid password, please try again." });
    }

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(404).json({ message: "User data not found." });
    }
  } catch (err) {
    next(err);
  }
};
