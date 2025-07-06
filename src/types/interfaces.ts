import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
}

export interface IFolder extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface INote extends Document {
  title: string;
  content: string;
  type: "text" | "checklist";
  checklist?: { text: string; checked: boolean }[];
  reminder?: Date;
  archived: boolean;
  folder?: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}
