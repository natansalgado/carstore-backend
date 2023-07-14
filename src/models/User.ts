import mongoose from "mongoose";

const { Schema, model } = mongoose;

export interface IUser {
  created_at?: Date;
  name: string;
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
