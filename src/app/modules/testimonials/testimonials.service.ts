import { Testimonial } from "./testimonials.model";

const getAllTestimonials = async () => {
  const result = await Testimonial.find();
  return result;
};

export const testimonialServices = {
  getAllTestimonials,
};
