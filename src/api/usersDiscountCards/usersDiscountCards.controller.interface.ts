import { UsersDiscountCards } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserID } from '../user/user.model';

export interface IUsersDiscountCardsController {
  addUserCardHandler: (
    request: FastifyRequest<{ Body: UsersDiscountCards }>,
    reply: FastifyReply,
  ) => Promise<void>;

  getUserCards: (
    request: FastifyRequest<{ Querystring: UserID }>,
    reply: FastifyReply,
  ) => Promise<void>;
}
