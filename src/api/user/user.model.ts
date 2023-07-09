import { User } from '@prisma/client';

export type UserID = Pick<User, 'id'>;
export type PartialUser = Partial<Omit<User, 'discount_cards'>>;
export type UpdateUser = Omit<PartialUser, 'id'>;
