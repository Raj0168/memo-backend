import { NextFunction, Request, Response } from "express";
import { Note } from "../models/note.model";

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, type, checklist, reminder, folder } = req.body;

    const note = await Note.create({
      title,
      content,
      type,
      checklist,
      reminder,
      folder,
      user: req.user!._id,
    });

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters: any = { user: req.user!._id };

    if (req.query.folder) filters.folder = req.query.folder;
    if (req.query.archived !== undefined)
      filters.archived = req.query.archived === "true";

    const notes = await Note.find(filters).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user!._id,
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user!._id },
      req.body,
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user!._id,
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    next(err);
  }
};
