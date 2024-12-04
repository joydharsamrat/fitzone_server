import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { analyticsServices } from "./analytics.services";

const handleGetStats = catchAsync(async (req, res) => {
  const result = await analyticsServices.getStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Stats retrieved successfully",
    data: result,
  });
});
const handleGetRevenueData = catchAsync(async (req, res) => {
  const result = await analyticsServices.getRevenueData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Revenue data retrieved successfully",
    data: result,
  });
});
const handleGetOrderStatusStats = catchAsync(async (req, res) => {
  const result = await analyticsServices.getOrderStatusStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order status stats retrieved successfully",
    data: result,
  });
});

export const analyticsControllers = {
  handleGetStats,
  handleGetRevenueData,
  handleGetOrderStatusStats,
};
