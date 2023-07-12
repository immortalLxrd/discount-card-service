import { PrismaClient, User } from '@prisma/client';
import { PartialUser, UpdateUser, UserID } from './user.model';
import { IUserService } from './user.service.interface';
import { Prisma } from '../../database/prisma';

export class UserService implements IUserService {
  private readonly _prisma: PrismaClient;

  constructor({ prisma }: { prisma: Prisma }) {
    this._prisma = prisma.PrismaClient;
  }

  public async getUsers(partialUserData: PartialUser): Promise<User[] | null> {
    return await this._prisma.user.findMany({
      where: partialUserData,
    });
  }

  public async getUserById(userID: UserID): Promise<User | null> {
    return await this._prisma.user.findUnique({
      where: userID,
    });
  }

  public async createUser(userData: User): Promise<User | null> {
    return await this._prisma.user.create({
      data: {
        ...userData,
        date_of_birth: new Date(userData.date_of_birth),
      },
    });
  }

  public async updateUser(
    userID: UserID,
    updateUserData: UpdateUser,
  ): Promise<User | null> {
    return await this._prisma.user.update({
      where: userID,
      data: updateUserData,
    });
  }

  public async deleteUser(userID: UserID): Promise<User | null> {
    return await this._prisma.user.delete({
      where: userID,
    });
  }
}
