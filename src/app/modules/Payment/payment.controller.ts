import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { initiatePayment } from "./payment.service";

const handleInitiatePayment = catchAsync(async (req, res) => {
  const result = await initiatePayment(req.body.amount);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Images retrieved successfully",
    data: result,
  });
});

export const paymentControllers = {
  handleInitiatePayment,
};
