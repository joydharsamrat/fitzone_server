import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { cartServices } from "./cart.serverce";

const handleCreateCartItem = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const result = await cartServices.createCartItem(_id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart item created successfully",
    data: result,
  });
});

const handleGetCartItemsByUser = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const result = await cartServices.getCartItemsByUser(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart item retrieved successfully",
    data: result,
  });
});

const handleUpdateCartItemsQuantity = catchAsync(async (req, res) => {
  const { id } = req.params;
  const quantity = Number(req.body.quantity);

  const result = await cartServices.updateCartItemQuantity(id, quantity);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart item updated successfully",
    data: result,
  });
});
const handleDeleteCartItem = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await cartServices.deleteCartItem(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart item deleted successfully",
    data: result,
  });
});

export const cartControllers = {
  handleCreateCartItem,
  handleGetCartItemsByUser,
  handleUpdateCartItemsQuantity,
  handleDeleteCartItem,
};
