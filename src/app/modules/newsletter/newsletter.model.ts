import { model, Schema } from "mongoose";
import { TNewsLetter } from "./newsletter.interface";

const newsletterSchema = new Schema<TNewsLetter>({
  email: { type: String, required: true },
});

export const Newsletter = model<TNewsLetter>("Newsletter", newsletterSchema);
