import mongoose, { Schema } from "mongoose";
import { IFolder } from "../types/interfaces";

const folderSchema = new Schema<IFolder>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const Folder = mongoose.model<IFolder>("Folder", folderSchema);
