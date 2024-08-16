import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export function validateRequest(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new Error('ValidationError'));
    } else {
      next();
    }
  };
}
