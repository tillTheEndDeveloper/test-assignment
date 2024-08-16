import { UserRole } from './roleEnum';

export interface UserDto {
  username: string;
  email: string;
  type: UserRole;
  password: string;
}
