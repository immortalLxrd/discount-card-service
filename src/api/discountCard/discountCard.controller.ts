import { DiscountCard, PrismaClient } from '@prisma/client';
import { DiscountCardService } from './discountCard.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DiscountCardID, PartialDiscountCard } from './discountCard.model';
import { IDiscountCardController } from './discountCard.controller.interface';
import { IDiscountCardService } from './discountCard.service.interface';

export class DiscountCardController implements IDiscountCardController {
  private readonly _discountCardService: IDiscountCardService;

  constructor(private readonly _prisma: PrismaClient) {
    this._discountCardService = new DiscountCardService(this._prisma);
  }

  public getDiscountCardsHandler = async (
    request: FastifyRequest<{ Params: PartialDiscountCard }>,
    reply: FastifyReply,
  ): Promise<void> => {
    reply.send(
      await this._discountCardService.getDiscountCards(request.params),
    );
  };

  public createDiscountCardHandler = async (
    request: FastifyRequest<{ Body: DiscountCard }>,
    reply: FastifyReply,
  ): Promise<void> => {
    reply.send(
      await this._discountCardService.createDiscountCard(request.body),
    );
  };

  public updateDiscountCardHandler = async (
    request: FastifyRequest<{
      Body: { target: DiscountCardID; data: PartialDiscountCard };
    }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { target, data } = request.body;

    reply.send(
      await this._discountCardService.updateDiscountCard(target, data),
    );
  };

  public deleteDiscountCardHandler = async (
    request: FastifyRequest<{
      Body: DiscountCardID;
    }>,
    reply: FastifyReply,
  ): Promise<void> => {
    reply.send(
      await this._discountCardService.deleteDiscountCard(request.body),
    );
  };
}
