import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export class Prisma {
  private readonly _prismaClient: PrismaClient;
  private _prismaPlugin?: FastifyPluginAsync;

  constructor() {
    this._prismaClient = new PrismaClient();
    this._initClient();
    this._initPlugin();
  }

  public get prismaPlugin(): FastifyPluginAsync | undefined {
    if (this._prismaPlugin) {
      return this._prismaPlugin;
    }
  }

  private async _initClient(): Promise<void> {
    await this._prismaClient.$connect();
  }

  private _initPlugin() {
    this._prismaPlugin = fp(async (server) => {
      server.decorate('prisma', this._prismaClient);
      server.addHook('onClose', async () => {
        await server.prisma.$disconnect();
      });
    });
  }
}
