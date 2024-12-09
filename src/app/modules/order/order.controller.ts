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
const handleGetOrderByUserId = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const result = await orderServices.getOrdersByUserId(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

const handleGetAllOrders = catchAsync(async (req, res) => {
  const result = await orderServices.getAllOrders();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const handleUpdateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.updateOrderStatus(id, req.body.status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order status updated successfully",
    data: result,
  });
});

const handleGetOrderById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.getOrderById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

export const orderControllers = {
  handleCreateOrder,
  handleGetOrderByUserId,
  handleGetAllOrders,
  handleUpdateOrderStatus,
  handleGetOrderById,
};
