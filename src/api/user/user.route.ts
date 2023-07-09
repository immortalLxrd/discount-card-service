import { FastifyInstance } from 'fastify';
import { UserController } from './user.controller';
import { PrismaClient } from '@prisma/client';
import { userSchema } from './user.schema';
import { IUserController } from './user.controller.interface';
import { IRoute } from '../../common/route.interface';

export class UserRoute implements IRoute {
  private readonly _userController: IUserController;

  constructor(private readonly _prisma: PrismaClient) {
    this._userController = new UserController(this._prisma);
  }

  public routes = async (app: FastifyInstance): Promise<void> => {
    ['/', '/find'].forEach((path) =>
      app.get(path, {
        schema: {
          response: {
            200: {
              type: 'array',
              items: {
                type: 'object',
                properties: userSchema,
              },
            },
          },
        },
        handler: this._userController.getUsersHandler,
      }),
    );

    app.get('/:id', {
      schema: {
        response: {
          200: userSchema,
        },
      },
      handler: this._userController.getUserByIdHandler,
    });

    app.post('/', {
      schema: {
        body: {
          type: 'object',
          properties: userSchema,
          required: [
            'first_name',
            'last_name',
            'phone_number',
            'date_of_birth',
          ],
        },
      },
      handler: this._userController.createUserHandler,
    });

    app.put('/', {
      schema: {
        body: {
          type: 'object',
          properties: {
            target: {
              type: 'object',
              properties: { id: { type: 'string' } },
            },
            data: {
              type: 'object',
              properties: userSchema,
            },
          },
        },
      },
      handler: this._userController.updateUserHandler,
    });

    app.delete('/', {
      schema: {
        body: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
      },
      handler: this._userController.deleteUserHandler,
    });
  };
}
