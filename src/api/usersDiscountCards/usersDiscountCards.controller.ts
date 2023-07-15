import { UsersDiscountCards } from '@prisma/client';
import { UsersDiscountCardsService } from './usersDiscountCards.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserID } from '../user/user.model';
import { IUsersDiscountCardsService } from './usersDiscountCards.service.interface';

export class UsersDiscountCardsController {
  private readonly _usersDiscountCardsService: IUsersDiscountCardsService;

  constructor({
    usersDiscountCardsService,
  }: {
    usersDiscountCardsService: UsersDiscountCardsService;
  }) {
    this._usersDiscountCardsService = usersDiscountCardsService;
  }

  public getUserCards = async (
    request: FastifyRequest<{ Querystring: UserID }>,
    reply: FastifyReply,
  ) => {
    reply
      .code(200)
      .send(await this._usersDiscountCardsService.getUserCards(request.query));
  };

  public addUserCardHandler = async (
    request: FastifyRequest<{ Body: UsersDiscountCards }>,
    reply: FastifyReply,
  ) => {
    reply
      .code(201)
      .send(await this._usersDiscountCardsService.addUserCard(request.body));
  };
}
