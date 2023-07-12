import { DiscountCard, PrismaClient } from '@prisma/client';
import {
  DiscountCardID,
  PartialDiscountCard,
  UpdateDiscountCard,
} from './discountCard.model';
import { IDiscountCardService } from './discountCard.service.interface';
import { Prisma } from '../../database/prisma';

export class DiscountCardService implements IDiscountCardService {
  private readonly _prisma: PrismaClient;

  constructor({ prisma }: { prisma: Prisma }) {
    this._prisma = prisma.PrismaClient;
  }

  public async getDiscountCards(
    partialDiscountCard: PartialDiscountCard,
  ): Promise<DiscountCard[] | null> {
    return await this._prisma.discountCard.findMany({
      where: {
        ...partialDiscountCard,
      },
    });
  }

  public async createDiscountCard(
    discountCardData: DiscountCard,
  ): Promise<DiscountCard | null> {
    return await this._prisma.discountCard.create({
      data: {
        ...discountCardData,
      },
    });
  }

  public async updateDiscountCard(
    discountCardID: DiscountCardID,
    updateDiscountCardData: UpdateDiscountCard,
  ): Promise<DiscountCard | null> {
    return await this._prisma.discountCard.update({
      where: discountCardID,
      data: updateDiscountCardData,
    });
  }

  public async deleteDiscountCard(
    discountCardID: DiscountCardID,
  ): Promise<DiscountCard | null> {
    return await this._prisma.discountCard.delete({
      where: discountCardID,
    });
  }
}
