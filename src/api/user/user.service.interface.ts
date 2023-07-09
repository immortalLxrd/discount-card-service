import { User } from '@prisma/client';
import { PartialUser, UpdateUser, UserID } from './user.model';

export interface IUserService {
  getUsers: (partialUserData: PartialUser) => Promise<User[] | null>;

  getUserById: (userID: UserID) => Promise<User | null>;

  createUser: (userData: User) => Promise<User | null>;

  updateUser: (
    userID: UserID,
    updateUserData: UpdateUser,
  ) => Promise<User | null>;

  deleteUser: (userID: UserID) => Promise<User | null>;
}
