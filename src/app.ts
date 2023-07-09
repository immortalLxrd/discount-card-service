import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { Prisma } from './database/prisma';
import { Api } from './api/api.route';

type AppOptions = Partial<FastifyServerOptions>;

export class App {
  private readonly _options: AppOptions = {
    logger: true,
  };
  public fastify: FastifyInstance = Fastify(this._options);
  private _api: Api = new Api(this.fastify.prisma); // !!! REWRITE !!!
  private _prisma: Prisma = new Prisma();

  constructor() {
    this.registerPlugins();
  }

  private registerPlugins = async (): Promise<void> => {
    if (this._prisma.prismaPlugin) {
      await this.fastify.register(this._prisma.prismaPlugin);
    }

    this._api = new Api(this.fastify.prisma); // !!! REWRITE !!!

    await this.fastify.register(this._api.routes, {
      prefix: '/api',
    });
  };

  public init = async (): Promise<void> => {
    await this.fastify
      .listen({
        port: 4000,
        host: '::',
      })
      .catch((error) => {
        this.fastify.log.error(error);
        process.exit(1);
      });
  };
}
