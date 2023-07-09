import { DiscountCard } from '@prisma/client';

export type DiscountCardID = Pick<DiscountCard, 'id'>;
export type PartialDiscountCard = Partial<DiscountCard>;
export type UpdateDiscountCard = Omit<PartialDiscountCard, 'id'>;
