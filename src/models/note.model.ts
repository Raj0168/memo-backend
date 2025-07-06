import mongoose, { Schema } from "mongoose";
import { INote } from "../types/interfaces";

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, default: "" },
    type: { type: String, enum: ["text", "checklist"], default: "text" },
    checklist: [
      {
        text: String,
        checked: { type: Boolean, default: false },
      },
    ],
    reminder: Date,
    archived: { type: Boolean, default: false },
    folder: { type: Schema.Types.ObjectId, ref: "Folder" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
export const Note = mongoose.model<INote>("Note", noteSchema);
