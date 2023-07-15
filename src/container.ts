import { diContainer } from '@fastify/awilix';
import { UserService } from './api/user/user.service';
import { asClass } from 'awilix';
import { ApiRoute } from './api/api.route';
import { IUserService } from './api/user/user.service.interface';
import { UserController } from './api/user/user.controller';
import { IUserController } from './api/user/user.controller.interface';
import { UserRoute } from './api/user/user.route';
import { IRoute } from './common/route.interface';
import { Prisma } from './database/prisma';
import { DiscountCardRoute } from './api/discountCard/discountCard.route';
import { DiscountCardController } from './api/discountCard/discountCard.controller';
import { DiscountCardService } from './api/discountCard/discountCard.service';
import { IDiscountCardService } from './api/discountCard/discountCard.service.interface';
import { UsersDiscountCardsRoute } from './api/usersDiscountCards/usersDiscountCards.route';
import { UsersDiscountCardsController } from './api/usersDiscountCards/usersDiscountCards.controller';
import { UsersDiscountCardsService } from './api/usersDiscountCards/usersDiscountCards.service';
import { IUsersDiscountCardsController } from './api/usersDiscountCards/usersDiscountCards.controller.interface';
import { IDiscountCardController } from './api/discountCard/discountCard.controller.interface';
import { IUsersDiscountCardsService } from './api/usersDiscountCards/usersDiscountCards.service.interface';
import { App } from './app';

declare module '@fastify/awilix' {
  interface Cradle {
    prisma: Prisma;

    app: App;

    apiRoute: IRoute;

    userRoute: IRoute;
    userController: IUserController;
    userService: IUserService;

    discountCardRoute: IRoute;
    discountCardController: IDiscountCardController;
    discountCardService: IDiscountCardService;

    usersDiscountCardsRoute: IRoute;
    usersDiscountCardsController: IUsersDiscountCardsController;
    usersDiscountCardsService: IUsersDiscountCardsService;
  }
}

export class Container {
  private static _instance: Container;
  private _container = diContainer;

  constructor() {
    this._registerDependencies();
  }

  public static getInstance(): Container {
    if (!Container._instance) {
      Container._instance = new Container();
    }

    return Container._instance;
  }

  private _registerDependencies(): void {
    this._container.register({
      prisma: asClass(Prisma, { lifetime: 'SINGLETON' }),

      app: asClass(App, { lifetime: 'SCOPED' }),

      apiRoute: asClass(ApiRoute, { lifetime: 'SCOPED' }),

      userRoute: asClass(UserRoute, { lifetime: 'SCOPED' }),
      userController: asClass(UserController, { lifetime: 'SCOPED' }),
      userService: asClass(UserService, { lifetime: 'SCOPED' }),

      discountCardRoute: asClass(DiscountCardRoute, { lifetime: 'SCOPED' }),
      discountCardController: asClass(DiscountCardController, {
        lifetime: 'SCOPED',
      }),
      discountCardService: asClass(DiscountCardService, { lifetime: 'SCOPED' }),

      usersDiscountCardsRoute: asClass(UsersDiscountCardsRoute, {
        lifetime: 'SCOPED',
      }),
      usersDiscountCardsController: asClass(UsersDiscountCardsController, {
        lifetime: 'SCOPED',
      }),
      usersDiscountCardsService: asClass(UsersDiscountCardsService, {
        lifetime: 'SCOPED',
      }),
    });
  }

  public resolve<T>(name: string): T {
    return this._container.resolve(name);
  }
}
