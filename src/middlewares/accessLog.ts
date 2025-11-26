import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const accessLog = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, url, headers, body } = req;

  // Capture response details
  const originalSend = res.send;
  res.send = function (resbody: any) {
    const duration = Date.now() - start;
    logger.info("access log:", {
      method,
      url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      headers: {
        "user-agent": headers["user-agent"],
        "content-type": headers["content-type"],
        "content-length": headers["content-length"],
      },
      body: method !== "GET" ? body : undefined,
    });
    return originalSend.call(this, resbody);
  };

  next();
};
