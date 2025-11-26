import { AppError } from "../types/index";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error("Error occurred:", err);

  let statusCode = 500;
  let code: string = "0000001";
  let message: string = "";
  let result: any = undefined;

  if (err instanceof AppError) {
    let codes = err.code.split(".");
    statusCode = parseInt(codes[0]);
    code = codes[1];
    message = err.message;
    result = err.result;
  } else if (err instanceof Error) {
    if (err.name === "CastError") {
      message = "cast error";
      result = err.message;
    } else {
      message = err.message;
    }
  }

  res.status(statusCode).json({
    code,
    message,
    result,
  });
};
