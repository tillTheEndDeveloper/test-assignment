import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  switch (err.name) {
    case 'ValidationError':
      return res.status(400).json({ message: err.message });
    case 'ConflictError':
      return res.status(409).json({ message: err.message });
    case 'AuthenticationError':
      return res.status(401).json({ message: err.message });
    case 'NotFoundError':
      return res.status(404).json({ message: err.message });
    default:
      console.error(err.stack);
      return res.status(500).json({ message: 'Something went wrong.' });
  }
}

export default errorHandler;
