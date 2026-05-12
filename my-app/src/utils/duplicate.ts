import type { User } from "../types/user";

export function isDuplicate(users: User[], email: string): boolean {
  return users.some((user) => user.email === email);
}