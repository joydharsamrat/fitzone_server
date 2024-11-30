import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const handleGetUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Users retrieved successfully",
    data: result,
  });
});
const handleGetUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getUserById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " User retrieved successfully",
    data: result,
  });
});

const handleUpdateUser = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const result = await userServices.updateUser(_id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " User updated successfully",
    data: result,
  });
});

const handleMakeAdmin = catchAsync(async (req, res) => {
  const { id } = req.query;

  const result = await userServices.makeAdmin(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " User role updated successfully",
    data: result,
  });
});

export const userControllers = {
  handleGetUsers,
  handleGetUserById,
  handleUpdateUser,
  handleMakeAdmin,
};
