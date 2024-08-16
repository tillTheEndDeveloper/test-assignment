import { UserRole } from '../models/roleEnum';

interface UserEntry {
  email: string;
  type: UserRole;
  salt: string;
  passwordHash: string;
}

class MemoryDb {
  private readonly db: Record<string, UserEntry> = {};

  getUser(username: string): UserEntry | undefined {
    return this.db[username];
  }

  addUser(username: string, userEntry: UserEntry): void {
    this.db[username] = userEntry;
  }

  userExists(username: string): boolean {
    return !!this.db[username];
  }
}

export const memoryDb = new MemoryDb();
