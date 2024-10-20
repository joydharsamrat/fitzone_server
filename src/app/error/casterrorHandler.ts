import mongoose from "mongoose";
import { TGenericResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TGenericResponse => {
  const statusCode = 400;
  const errorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};
export default handleCastError;
