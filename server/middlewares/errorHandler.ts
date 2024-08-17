import { Request, Response, NextFunction } from 'express';
import { ValidationError, ConflictError, AuthenticationError, NotFoundError } from '../errors/customErrors';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof ConflictError) {
    return res.status(409).json({ message: err.message });
  }
  if (err instanceof AuthenticationError) {
    return res.status(401).json({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  console.error(err.stack);
  return res.status(500).json({ message: 'Something went wrong.' });
}

export default errorHandler;
