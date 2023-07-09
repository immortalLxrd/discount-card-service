import { PrismaClient, UsersDiscountCards } from '@prisma/client';
import { UsersDiscountCardsService } from './usersDiscountCards.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserID } from '../user/user.model';
import { IUsersDiscountCardsService } from './usersDiscountCards.service.interface';

export class UsersDiscountCardsController {
  private readonly _usersDiscountCardsService: IUsersDiscountCardsService;

  constructor(private readonly _prisma: PrismaClient) {
    this._usersDiscountCardsService = new UsersDiscountCardsService(
      this._prisma,
    );
  }

  public addUserCardHandler = async (
    request: FastifyRequest<{ Body: UsersDiscountCards }>,
    reply: FastifyReply,
  ) => {
    reply.send(await this._usersDiscountCardsService.addUserCard(request.body));
  };

  public getUserCards = async (
    request: FastifyRequest<{ Querystring: UserID }>,
    reply: FastifyReply,
  ) => {
    reply.send(
      await this._usersDiscountCardsService.getUserCards(request.query),
    );
  };
}
