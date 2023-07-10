import mongoose from "mongoose";

const { Schema, model } = mongoose;

export interface IUser {
  name: string;
  created_at: Date;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
