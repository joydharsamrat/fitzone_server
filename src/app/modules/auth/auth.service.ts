import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import createToken from "./auth.utils";
import config from "../../config";
import { TUser } from "../user/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../error/appError";
import { resetPassEmailTemplate } from "../../templates/resetPassEmailTemplate";
import { sendEmail } from "../../utils/sendEmail";

const userSignUp = async (payload: TUser) => {
  const result = await User.create(payload);

  const jwtPayload = {
    _id: result._id,
    email: result.email,
    role: result.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_expires_in as string
  );

  result.password = "";

  return { accessToken, refreshToken };
};

const loginUser = async (payload: TAuth) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Incorrect password");
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_expires_in as string
  );

  user.password = "";

  return { accessToken, refreshToken };
};

const getAccessToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token_secret as string
  ) as JwtPayload;

  const user = await User.findById(decoded._id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found !");
  }

  if (
    user.passwordChangedAt &&
    User.isJwtIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      decoded.iat as number
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is unauthorized");
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string
  );

  return { accessToken };
};

const changePassword = async (
  id: string,
  payload: { newPassword: string; oldPassword: string }
) => {
  const user = await User.findById(id).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = bcrypt.compare(payload.oldPassword, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password not matched !");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salts)
  );

  const result = await User.findOneAndUpdate(
    { _id: user._id, role: user.role },
    {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    },
    { new: true }
  );

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return { accessToken, refreshToken, data: result };
};

const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    "10m"
  );

  const subject = "AutoShine: Reset Password";

  const year = new Date().getFullYear();

  const resetUrl = `${config.reset_pass_url}?token=${token}`;

  const template = resetPassEmailTemplate(resetUrl, year);

  const result = sendEmail(template, user.email, subject);

  return result;
};

const resetPassword = async (id: string, password: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const newPassword = await bcrypt.hash(password, Number(config.bcrypt_salts));

  const result = await User.findByIdAndUpdate(id, {
    $set: {
      password: newPassword,
      passwordChangedAt: new Date(),
    },
  });

  return result;
};

export const authServices = {
  userSignUp,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getAccessToken,
};
