import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { imageService } from "./images.services";

const handleGetAllImages = catchAsync(async (req, res) => {
  const result = await imageService.getAllImages();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Images retrieved successfully",
    data: result,
  });
});

export const imageControllers = {
  handleGetAllImages,
};
