import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { testimonialServices } from "./testimonials.service";

const handleGetAllTestimonials = catchAsync(async (req, res) => {
  const result = await testimonialServices.getAllTestimonials();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonials retrieved successfully",
    data: result,
  });
});

export const testimonialControllers = {
  handleGetAllTestimonials,
};
