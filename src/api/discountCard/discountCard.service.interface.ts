import { DiscountCard } from '@prisma/client';
import {
  DiscountCardID,
  PartialDiscountCard,
  UpdateDiscountCard,
} from './discountCard.model';

export interface IDiscountCardService {
  getDiscountCards: (
    partialDiscountCard: PartialDiscountCard,
  ) => Promise<DiscountCard[] | null>;

  createDiscountCard: (
    discountCardData: DiscountCard,
  ) => Promise<DiscountCard | null>;

  updateDiscountCard: (
    discountCardID: DiscountCardID,
    updateDiscountCardData: UpdateDiscountCard,
  ) => Promise<DiscountCard | null>;

  deleteDiscountCard: (
    discountCardID: DiscountCardID,
  ) => Promise<DiscountCard | null>;
}
