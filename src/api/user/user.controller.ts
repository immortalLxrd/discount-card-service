import { FastifyReply, FastifyRequest } from 'fastify';
import { PartialUser, UpdateUser, UserID } from './user.model';
import { User } from '@prisma/client';
import { IUserController } from './user.controller.interface';
import { IUserService } from './user.service.interface';

export class UserController implements IUserController {
  private _userService: IUserService;

  constructor({ userService }: { userService: IUserService }) {
    this._userService = userService;
  }

  public getUserByIdHandler = async (
    request: FastifyRequest<{ Params: UserID }>,
    reply: FastifyReply,
  ): Promise<void> => {
    reply.code(200).send(await this._userService.getUserById(request.params));
  };

  public getUsersHandler = async (
    request: FastifyRequest<{ Querystring: PartialUser }>,
    reply: FastifyReply,
  ): Promise<void> => {
    reply.code(200).send(await this._userService.getUsers(request.query));
  };

  public createUserHandler = async (
    request: FastifyRequest<{ Body: User }>,
    reply: FastifyReply,
  ): Promise<void> => {
    reply.code(201).send(await this._userService.createUser(request.body));
  };

  public updateUserHandler = async (
    request: FastifyRequest<{ Body: { target: UserID; data: UpdateUser } }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { target, data } = request.body;
    reply.code(201).send(await this._userService.updateUser(target, data));
  };

  public deleteUserHandler = async (
    request: FastifyRequest<{ Body: UserID }>,
    reply: FastifyReply,
  ): Promise<void> => {
    reply.code(200).send(await this._userService.deleteUser(request.body));
  };
}
