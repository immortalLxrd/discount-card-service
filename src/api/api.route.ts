import { FastifyInstance } from 'fastify';
import { IRoute } from '../common/route.interface';

export class ApiRoute implements IRoute {
  private readonly _userRoute: IRoute;
  private readonly _discountCard: IRoute;
  private readonly _usersDiscountCards: IRoute;

  constructor({
    userRoute,
    discountCardRoute,
    usersDiscountCardsRoute,
  }: {
    userRoute: IRoute;
    discountCardRoute: IRoute;
    usersDiscountCardsRoute: IRoute;
  }) {
    this._userRoute = userRoute;
    this._discountCard = discountCardRoute;
    this._usersDiscountCards = usersDiscountCardsRoute;
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
