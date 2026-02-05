import { HttpException, HttpStatus } from '@nestjs/common';
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

// Throw Error (langsung throw exception)
export function throwError(
  message: string,
  statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
): never {
  throw new HttpException(
    {
      success: false,
      message,
      statusCode,
    },
    statusCode,
  );
}

// Throw Not Found Error
export function throwNotFound(message: string = 'Data not found'): never {
  throwError(message, HttpStatus.NOT_FOUND);
}

// Throw Bad Request Error
export function throwBadRequest(message: string = 'Bad request'): never {
  throwError(message, HttpStatus.BAD_REQUEST);
}

// Throw Unauthorized Error
export function throwUnauthorized(message: string = 'Unauthorized'): never {
  throwError(message, HttpStatus.UNAUTHORIZED);
}

// Throw Conflict Error (duplicate data)
export function throwConflict(message: string = 'Data already exists'): never {
  throwError(message, HttpStatus.CONFLICT);
}

// Throw Forbidden Error
export function throwForbidden(message: string = 'Forbidden'): never {
  throwError(message, HttpStatus.FORBIDDEN);
}
