import supertest from 'supertest';

import { TransactionType } from '../../models/types/transaction-type';
import { Record } from '../../models/record';
import { server } from '../../api/server';
import { generateID } from '../../test/helpers/generate-id';

const request = supertest(server);

const create = async ({
  userId,
  transactionType = TransactionType.BORROW,
}: {
  userId: string;
  transactionType?: TransactionType;
}) => {
  const record = Record.build({
    name: 'Trinna Trip',
    amount: 30000,
    description: 'Some description',
    isBadDebt: false,
    transactionType,
    userId,
  });
  await record.save();

  return record;
};

describe('[GET /api/records/recordId] GET Single Record', () => {
  it('require authentication get records', async () => {
    await request.get(`/api/records/${generateID()}`).expect(401);
  });

  it('returns 404 if record does not exist', async () => {
    await create({ userId: generateID() });

    const res = await request
      .get(`/api/records/${generateID()}`)
      .set('Cookie', global.signin().cookie);

    expect(res.status).toBe(404);
  });

  it('return 404 fetching record with id that is not among user record collection', async () => {
    const user = global.signin();

    await create({ userId: user.id });
    const record = await create({ userId: generateID() });

    const res = await request
      .get(`/api/records/${record.id}`)
      .set('Cookie', user.cookie);

    expect(res.status).toBe(404);
  });

  it('return record with id for current user', async () => {
    const user = global.signin();

    const record = await create({ userId: user.id });
    await create({ userId: generateID() });

    const res = await request
      .get(`/api/records/${record.id}`)
      .set('Cookie', user.cookie);

    expect(res.body.name).toEqual(record.name);
    expect(res.body.userId).toEqual(user.id);
  });
});
