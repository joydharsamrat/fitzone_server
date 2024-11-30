import { model, Schema } from "mongoose";
import { TImage } from "./images.interface";

const imagesSchema = new Schema<TImage>(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export const Image = model<TImage>("Image", imagesSchema);
