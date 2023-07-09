export const discountCardSchema = {
  id: { type: 'number' },
  name: { type: 'string' },
  discount_percentage: { type: 'number' },
  date_of_creation: { anyOf: [{ type: 'number' }, { type: 'string' }] },
};
