import type { User } from "../types/user";

export function filterUsers(users: User[], value: string): User[] {
  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.phone.toLowerCase().includes(value) ||
      user.gender.toLowerCase().includes(value)
    );
  });
}