import { ErrorTypes } from './errorTypes';

export interface AppError extends Error {
  name: ErrorTypes;
  message: string;
  stack?: string;
}
