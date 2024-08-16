import { Request, Response, NextFunction } from 'express';
import userManagerService from '../services/userManagerService';

class UserController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userManagerService.registerUser(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const result = await userManagerService.authenticateUser(username, password);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = userManagerService.getUserData(req.params.username);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
