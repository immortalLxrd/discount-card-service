import { DiscountCard, PrismaClient } from '@prisma/client';
import { DiscountCardID, PartialDiscountCard, UpdateDiscountCard } from './discountCard.model';
import { IDiscountCardService } from './discountCard.service.interface';

export class DiscountCardService implements IDiscountCardService {
  constructor(private readonly _prisma: PrismaClient) {}

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
