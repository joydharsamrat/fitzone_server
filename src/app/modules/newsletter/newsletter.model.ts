import { model, Schema } from "mongoose";
import { TNewsLetter } from "./newsletter.interface";

const newsletterSchema = new Schema<TNewsLetter>(
  {
    email: { type: String, required: true },
    status: { type: String, enum: ["active", "canceled"], default: "active" },
  },
  { timestamps: true }
);

export const Newsletter = model<TNewsLetter>("Newsletter", newsletterSchema);
