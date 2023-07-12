import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export class Prisma {
  private readonly _prismaClient: PrismaClient;

  constructor() {
    this._prismaClient = new PrismaClient();
  }

  public get PrismaClient(): PrismaClient {
    return this._prismaClient;
  }
}
