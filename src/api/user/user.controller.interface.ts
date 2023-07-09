import { FastifyReply, FastifyRequest } from 'fastify';
import { PartialUser, UpdateUser, UserID } from './user.model';
import { User } from '@prisma/client';

export interface IUserController {
  getUserByIdHandler: (
    request: FastifyRequest<{ Params: UserID }>,
    reply: FastifyReply,
  ) => Promise<void>;

  getUsersHandler: (
    request: FastifyRequest<{ Querystring: PartialUser }>,
    reply: FastifyReply,
  ) => Promise<void>;

  createUserHandler: (
    request: FastifyRequest<{ Body: User }>,
    reply: FastifyReply,
  ) => Promise<void>;

  updateUserHandler: (
    request: FastifyRequest<{ Body: { target: UserID; data: UpdateUser } }>,
    reply: FastifyReply,
  ) => Promise<void>;

  deleteUserHandler: (
    request: FastifyRequest<{ Body: UserID }>,
    reply: FastifyReply,
  ) => Promise<void>;
}
