import { DiscountCard } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DiscountCardID, PartialDiscountCard } from './discountCard.model';

export interface IDiscountCardController {
  getDiscountCardsHandler: (
    request: FastifyRequest<{ Params: PartialDiscountCard }>,
    reply: FastifyReply,
  ) => Promise<void>;

  createDiscountCardHandler: (
    request: FastifyRequest<{ Body: DiscountCard }>,
    reply: FastifyReply,
  ) => Promise<void>;

  updateDiscountCardHandler: (
    request: FastifyRequest<{
      Body: { target: DiscountCardID; data: PartialDiscountCard };
    }>,
    reply: FastifyReply,
  ) => Promise<void>;

  deleteDiscountCardHandler: (
    request: FastifyRequest<{
      Body: DiscountCardID;
    }>,
    reply: FastifyReply,
  ) => Promise<void>;
}
