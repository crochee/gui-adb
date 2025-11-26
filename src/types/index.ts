// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    result?: any;
  };
}

// Custom Error Types
export class AppError extends Error {
  public code: string;
  public statusCode: number;
  public result?: any;

  constructor(code: string, message: string, result?: any) {
    super(message);
    this.code = code;
    // Extract status code from error code (e.g., "500.0000001" -> 500)
    this.statusCode = parseInt(code.split('.')[0], 10) || 500;
    this.result = result;
  }
}
