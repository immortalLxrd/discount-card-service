import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { IRoute } from './common/route.interface';

type AppOptions = Partial<FastifyServerOptions>;

export class App {
  private readonly _envToLogger: any = {
    development: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
    production: true,
    test: false,
  };
  private readonly _options: AppOptions = {
    logger:
      (process.env.NODE_ENV && this._envToLogger[process.env.NODE_ENV]) ?? true,
  };
  public readonly app: FastifyInstance = Fastify(this._options);
  private readonly _api: IRoute;

  constructor({ apiRoute }: { apiRoute: IRoute }) {
    this._api = apiRoute;

    this.registerPlugins();
  }

  private registerPlugins = async (): Promise<void> => {
    await this.app.register(this._api.routes, {
      prefix: '/api',
    });
  };

  public init = async (): Promise<void> => {
    await this.app
      .listen({
        port: 4000,
        host: '::',
      })
      .catch((error) => {
        this.app.log.error(error);
        process.exit(1);
      });
  };
}
