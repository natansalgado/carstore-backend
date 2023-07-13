import mongoose from "mongoose";

const { Schema, model } = mongoose;

export interface ICar {
  owner: string;
  brand: string;
  model: string;
  year: number;
  kms: number;
  color: string;
  price: number;
  modifications: string[];
  damaged_parts: string[];
}

const CarSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    kms: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    modifications: { type: Array, required: true },
    damaged_parts: { type: Array, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Car = model<ICar>("Car", CarSchema);
