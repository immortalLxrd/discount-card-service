import { DiscountCard, PrismaClient, UsersDiscountCards } from '@prisma/client';
import { UserID } from '../user/user.model';
import { IUsersDiscountCardsService } from './usersDiscountCards.service.interface';

export class UsersDiscountCardsService implements IUsersDiscountCardsService {
  constructor(private readonly _prisma: PrismaClient) {}

  public async addUserCard(
    userData: UsersDiscountCards,
  ): Promise<UsersDiscountCards> {
    return await this._prisma.usersDiscountCards.create({
      data: userData,
    });
  }

  public async getUserCards(userID: UserID): Promise<(DiscountCard | null)[]> {
    const discountCards = await this._prisma.usersDiscountCards.findMany({
      where: {
        user_id: userID.id,
      },
    });

    const result = await Promise.all(
      discountCards.map(async (userDiscountCard) => {
        return await this._prisma.discountCard.findUnique({
          where: {
            id: userDiscountCard.discount_card_id,
          },
        });
      }),
    );

    return result;
  }
}
