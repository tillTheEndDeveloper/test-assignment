import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../errors/customErrors';
import { Schema } from 'joi';

export function validateRequest(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new ValidationError('Invalid credentials'));
    } else {
      next();
    }
  };
}
