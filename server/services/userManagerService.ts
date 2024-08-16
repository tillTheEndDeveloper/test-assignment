import * as bcrypt from 'bcryptjs';
import { memoryDb } from '../storage/memoryDb';
import { UserDto } from '../models/userDto';
import { ConflictError, AuthenticationError, NotFoundError } from '../errors/customErrors';
import authService from './authService';

class UserManagerService {
  async registerUser(userDto: UserDto): Promise<{ username: string; email: string; type: string }> {
    const { username, email, password, type } = userDto;

    if (memoryDb.userExists(username)) {
      throw new ConflictError('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    memoryDb.addUser(username, { email, type, salt, passwordHash });

    return { username, email, type };
  }

  async authenticateUser(username: string, password: string): Promise<{ token: string; username: string; email: string; type: string }> {
    const user = memoryDb.getUser(username);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = authService.generateToken({ username, type: user.type });
    return { token, username, email: user.email, type: user.type };
  }

  getUserData(username: string): { username: string; email: string; type: string } {
    const user = memoryDb.getUser(username);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return { username, email: user.email, type: user.type };
  }
}

export default new UserManagerService();
