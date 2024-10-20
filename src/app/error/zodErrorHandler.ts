import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericResponse } from "../interface/error";

const zodErrorHandler = (err: ZodError): TGenericResponse => {
  const statusCode = 400;

  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default zodErrorHandler;
