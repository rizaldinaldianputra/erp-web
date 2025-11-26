export interface User {
  id?: number;
  username: string;
  password?: string;
  email?: string;
  role?: string;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
  supervisor?: User;
}

export function getFullName(user: User): string {
  return user.username;
}
