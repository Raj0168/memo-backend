import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: InstanceType<typeof User>;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ messsage: "No token found." });
  }

  try {
    console.log(process.env.JWT_SECRET, "token");
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default JWT Token here"
    ) as {
      id: string;
    };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
