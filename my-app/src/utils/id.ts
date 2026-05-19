let counter = 0;

export function generateId(): string {
  return `user-${Date.now()}-${++counter}`;
}