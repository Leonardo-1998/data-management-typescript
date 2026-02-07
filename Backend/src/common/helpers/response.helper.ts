import { ApiResponse } from '../interfaces/response.interface';

// Success Response
export function successResponse<T>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200,
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
}

// Error Response (return object)
export function errorResponse(
  message: string,
  error?: string,
  statusCode: number = 400,
): ApiResponse {
  return {
    success: false,
    message,
    error,
    statusCode,
  };
}
