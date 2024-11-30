import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
import { TUserRole } from "../modules/user/user.interface";
import AppError from "../error/appError";

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User is unauthorized");
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_token_secret as string
      ) as JwtPayload;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Token has expired");
      }
      if (err instanceof jwt.JsonWebTokenError) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
      }
      throw new AppError(httpStatus.UNAUTHORIZED, "Authorization error");
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    } else if (
      user.passwordChangedAt &&
      User.isJwtIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        decoded.iat as number
      )
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Token is invalid due to a password change"
      );
    } else if (roles.length && !roles.includes(decoded.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "User does not have the required role"
      );
    }

    req.user = decoded;
    next();
  });
};

export default auth;
