/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import zodErrorHandler from "../error/zodErrorHandler";
import handleValidationError from "../error/validationErrorHandler";
import handleCastError from "../error/casterrorHandler";
import handleDuplicateError from "../error/duplicateErrorHandler";
import AppError from "../error/appError";
import { TErrorSource } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "something went wrong !";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "something went wrong !",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: config.node_ENV === "development" ? err.stack : null,
  });
};

export default globalErrorHandler;
