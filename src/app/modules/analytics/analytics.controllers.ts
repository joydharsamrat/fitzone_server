import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { analyticsServices } from "./analytics.services";

const handleGetStats = catchAsync(async (req, res) => {
  const result = await analyticsServices.getStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Testimonials retrieved successfully",
    data: result,
  });
});

export const analyticsControllers = {
  handleGetStats,
};
