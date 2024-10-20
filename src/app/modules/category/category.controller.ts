import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { categoryServices } from "./category.service";

const handleCreateCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category created successfully",
    data: result,
  });
});
const handleGetAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

export const categoryControllers = {
  handleCreateCategory,
  handleGetAllCategories,
};
