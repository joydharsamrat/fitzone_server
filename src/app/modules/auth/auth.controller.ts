import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import config from "../../config";

const handleUserSignUp = catchAsync(async (req, res) => {
  const result = await authServices.userSignUp(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const handleUserLogin = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_ENV === "production",
    httpOnly: true,
    sameSite: config.node_ENV === "production" ? "none" : "lax",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: { token: accessToken },
  });
});

const handleGetAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.getAccessToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token retrieved successfully",
    data: result,
  });
});

const handleChangePassword = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const result = await authServices.changePassword(_id, req.body);

  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_ENV === "production",
    httpOnly: true,
    sameSite: config.node_ENV === "production" ? "none" : "lax",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: { token: accessToken },
  });
});

const handleForgotPassword = catchAsync(async (req, res) => {
  const result = await authServices.forgotPassword(req.body.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset link sent successfully",
    data: result,
  });
});
const handleResetPassword = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const result = await authServices.resetPassword(_id, req.body.password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

export const authControllers = {
  handleUserSignUp,
  handleUserLogin,
  handleGetAccessToken,
  handleChangePassword,
  handleForgotPassword,
  handleResetPassword,
};
