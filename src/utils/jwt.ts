import jwt from "jsonwebtoken";
import { IUser } from "../types/interfaces";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function generateToken(user: IUser) {
  console.log("token: ", JWT_SECRET);
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}