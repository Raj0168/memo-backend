import dotenv from "dotenv";
// loads any env variables to application
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes";
import folderRoutes from "./routes/folder.routes";
import noteRoutes from "./routes/note.routes";

// creates express instance named app
const app = express();

// tells express to parse json data in body of requests, common for APIs
app.use(express.json());

// sets up the / (root) for our application, will send the message.
app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/folder", folderRoutes);
app.use("/api/note", noteRoutes);

// error handling middleware, catches error if any part throws an error and sends 500 (service error)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// connects to mongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
