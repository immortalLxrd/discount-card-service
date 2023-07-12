import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { Container } from './container';
import { IRoute } from './common/route.interface';

type AppOptions = Partial<FastifyServerOptions>;

export class App {
  private readonly _options: AppOptions = {
    logger: true,
  };
  public readonly app: FastifyInstance = Fastify(this._options);
  private readonly _api: IRoute;
  private readonly _container: Container;

  constructor() {
    this._container = Container.getInstance();
    this._api = this._container.resolve('apiRoute');

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
