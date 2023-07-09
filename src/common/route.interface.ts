import { FastifyInstance } from 'fastify';

export interface IRoute {
  routes: (app: FastifyInstance) => Promise<void>;
}
