import { DiscountCard, UsersDiscountCards } from '@prisma/client';
import { UserID } from '../user/user.model';

export interface IUsersDiscountCardsService {
  addUserCard: (userData: UsersDiscountCards) => Promise<UsersDiscountCards>;

  getUserCards: (userID: UserID) => Promise<(DiscountCard | null)[]>;
}
