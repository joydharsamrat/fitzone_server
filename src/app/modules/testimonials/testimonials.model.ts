import { model, Schema } from "mongoose";
import { TTestimonials } from "./testimonials.interface";

const testimonialSchema = new Schema<TTestimonials>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial = model("Testimonial", testimonialSchema);
