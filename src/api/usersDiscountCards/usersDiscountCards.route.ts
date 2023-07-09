import { PrismaClient } from '@prisma/client';
import { UsersDiscountCardsController } from './usersDiscountCards.controller';
import { FastifyInstance } from 'fastify';
import { IRoute } from '../../common/route.interface';
import { usersDiscountCardsSchema } from './usersDiscountCards.schema';
import { discountCardSchema } from '../discountCard/discountCard.schema';
import { IUsersDiscountCardsController } from './usersDiscountCards.controller.interface';

export class UsersDiscountCardsRoute implements IRoute {
  private readonly _usersDiscountCardsController: IUsersDiscountCardsController;

  constructor(private readonly _prisma: PrismaClient) {
    this._usersDiscountCardsController = new UsersDiscountCardsController(
      this._prisma,
    );
  }

  public routes = async (app: FastifyInstance): Promise<void> => {
    app.post('/add_user_card', {
      schema: {
        body: {
          type: 'object',
          properties: usersDiscountCardsSchema,
          required: ['user_id', 'discount_card_id'],
        },
      },
      handler: this._usersDiscountCardsController.addUserCardHandler,
    });

    app.get('/get_user_cards', {
      schema: {
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: discountCardSchema,
            },
          },
        },
      },
      handler: this._usersDiscountCardsController.getUserCards,
    });
  };
}
