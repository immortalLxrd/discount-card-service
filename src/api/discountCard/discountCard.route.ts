import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { DiscountCardController } from './discountCard.controller';
import { discountCardSchema } from './discountCard.schema';
import { IDiscountCardController } from './discountCard.controller.interface';
import { IRoute } from '../../common/route.interface';

export class DiscountCardRoute implements IRoute {
  private _discountCardController: IDiscountCardController;

  constructor({
    discountCardController,
  }: {
    discountCardController: DiscountCardController;
  }) {
    this._discountCardController = discountCardController;
  }

  public routes = async (app: FastifyInstance): Promise<void> => {
    ['/', '/find'].forEach((path) => {
      app.get(path, {
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
        handler: this._discountCardController.getDiscountCardsHandler,
      });
    });

    app.post('/', {
      schema: {
        body: {
          type: 'object',
          properties: discountCardSchema,
          required: ['name'],
        },
      },
      handler: this._discountCardController.createDiscountCardHandler,
    });

    app.put('/', {
      schema: {
        body: {
          type: 'object',
          properties: {
            target: {
              type: 'object',
              properties: { id: { type: 'number' } },
            },
            data: {
              type: 'object',
              properties: discountCardSchema,
            },
          },
        },
      },
      handler: this._discountCardController.updateDiscountCardHandler,
    });

    app.delete('/', {
      schema: {
        body: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
          required: ['id'],
        },
      },
      handler: this._discountCardController.deleteDiscountCardHandler,
    });
  };
}
