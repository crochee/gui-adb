import { AppError } from "../types";

// Error codes and messages
export const ERROR_CODES = {
  INTERNAL_SERVER_ERROR: "500.0000001",
  VALIDATION_ERROR: "400.0000002",
  NOT_FOUND: "404.0000003",
  UNAUTHORIZED: "401.0000004",
  FORBIDDEN: "403.0000005",
  CONFLICT: "409.0000006",
  BAD_REQUEST: "400.0000007",
  SERVICE_UNAVAILABLE: "503.0000008",
  TIMEOUT: "504.0000009",
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: "An unexpected error occurred",
  [ERROR_CODES.VALIDATION_ERROR]: "Validation failed",
  [ERROR_CODES.NOT_FOUND]: "Resource not found",
  [ERROR_CODES.UNAUTHORIZED]: "Unauthorized access",
  [ERROR_CODES.FORBIDDEN]: "Forbidden",
  [ERROR_CODES.CONFLICT]: "Resource already exists",
  [ERROR_CODES.BAD_REQUEST]: "Bad request",
  [ERROR_CODES.SERVICE_UNAVAILABLE]: "Service unavailable",
  [ERROR_CODES.TIMEOUT]: "Request timeout",
} as const;

// Custom error factory functions
export const createAppError = (
  code: string,
  message?: string,
  result?: any,
): AppError => {
  return new AppError(
    code,
    message || ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES],
    result,
  );
};

export const notFoundError = (resource: string, result?: any): AppError => {
  return createAppError(ERROR_CODES.NOT_FOUND, `${resource} not found`, result);
};

export const validationError = (message: string, result?: any): AppError => {
  return createAppError(ERROR_CODES.VALIDATION_ERROR, message, result);
};

export const unauthorizedError = (message?: string, result?: any): AppError => {
  return createAppError(ERROR_CODES.UNAUTHORIZED, message, result);
};

export const forbiddenError = (message?: string, result?: any): AppError => {
  return createAppError(ERROR_CODES.FORBIDDEN, message, result);
};

export const conflictError = (message: string, result?: any): AppError => {
  return createAppError(ERROR_CODES.CONFLICT, message, result);
};

export const badRequestError = (message: string, result?: any): AppError => {
  return createAppError(ERROR_CODES.BAD_REQUEST, message, result);
};

export const serviceUnavailableError = (
  message?: string,
  result?: any,
): AppError => {
  return createAppError(ERROR_CODES.SERVICE_UNAVAILABLE, message, result);
};

export const timeoutError = (message?: string, result?: any): AppError => {
  return createAppError(ERROR_CODES.TIMEOUT, message, result);
};
