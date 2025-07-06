import { NextFunction, Request, Response } from "express";
import { Folder } from "../models/folder.model";

export const createFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const folder = await Folder.create({ name, user: req.user!._id });

    res.status(201).json({ folder });
  } catch (err) {
    next(err);
  }
};

export const getFolders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folders = await Folder.find({ user: req.user!._id }).sort({
      createdAt: -1,
    });
    res.status(201).json({ folders });
  } catch (err) {
    next(err);
  }
};

export const updateFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folder = await Folder.findOneAndUpdate(
      { _id: req.params.id, user: req.user!._id },
      { name: req.body.name },
      { new: true }
    );

    if (!folder) {
      return res.status(404).json({ message: "Folder not found." });
    }
    res.json(folder);
  } catch (err) {
    next(err);
  }
};

export const deleteFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const folder = await Folder.findByIdAndDelete(
      { _id: req.params.id },
      { user: req.user!._id }
    );

    if (!folder) return res.status(404).json({ message: "Folder not found" });

    res.json({ message: "Folder deleted" });
  } catch (err) {
    next(err);
  }
};
