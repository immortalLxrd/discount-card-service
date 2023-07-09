export const userSchema = {
  id: { type: 'string' },
  first_name: { type: 'string' },
  last_name: { type: 'string' },
  phone_number: { type: 'string' },
  date_of_birth: {
    anyOf: [{ type: 'number' }, { type: 'string' }],
  },
  date_of_creation: {
    anyOf: [{ type: 'number' }, { type: 'string' }],
  },
  email: {
    anyOf: [{ type: 'string' }, { type: 'null' }],
  },
  permissions: { type: 'string' },
};
