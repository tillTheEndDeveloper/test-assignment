import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

class AuthService {
  generateToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret');
  }
}

export default new AuthService();
