import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderServices } from "./order.service";

const handleCreateOrder = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const result = await orderServices.createOrder(_id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

export const orderControllers = {
  handleCreateOrder,
};
