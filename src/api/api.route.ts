import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { IRoute } from '../common/route.interface';
import { UserRoute } from './user/user.route';
import { DiscountCardRoute } from './discountCard/discountCard.route';
import { UsersDiscountCardsRoute } from './usersDiscountCards/usersDiscountCards.route';

export class Api implements IRoute {
  private readonly _userRoute: IRoute;
  private readonly _discountCard: IRoute;
  private readonly _usersDiscountCards: IRoute;

  constructor(private _prisma: PrismaClient) {
    this._userRoute = new UserRoute(this._prisma);
    this._discountCard = new DiscountCardRoute(this._prisma);
    this._usersDiscountCards = new UsersDiscountCardsRoute(this._prisma);
  }

  public routes = async (app: FastifyInstance): Promise<void> => {
    app.register(this._userRoute.routes, {
      prefix: '/user',
    });

    app.register(this._discountCard.routes, {
      prefix: '/discount_card',
    });

    app.register(this._usersDiscountCards.routes, {
      prefix: 'users_discount_cards',
    });
  };
}
