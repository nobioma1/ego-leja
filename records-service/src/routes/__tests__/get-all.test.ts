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

describe('[GET /api/records] GET Records', () => {
  it('require authentication get records', async () => {
    await request.get(`/api/records`).expect(401);
  });

  it('returns an empty array if user has no record yet', async () => {
    await create({ userId: generateID() });
    await create({ userId: generateID() });
    await create({ userId: generateID() });

    const res = await request
      .get('/api/records')
      .set('Cookie', global.signin().cookie);

    expect(res.body).toHaveLength(0);
  });

  it('return all records for current user', async () => {
    const user = global.signin();

    await create({ userId: user.id });
    await create({ userId: user.id });
    await create({ userId: user.id });
    await create({ userId: generateID() });

    const res = await request.get('/api/records').set('Cookie', user.cookie);

    expect(res.body).toHaveLength(3);
  });

  it('return appropriate lend records of lend/borrow by current user', async () => {
    const user = global.signin();

    await create({ userId: user.id, transactionType: TransactionType.BORROW });
    await create({ userId: user.id, transactionType: TransactionType.BORROW });
    await create({ userId: user.id, transactionType: TransactionType.LEND });
    await create({ userId: user.id, transactionType: TransactionType.BORROW });
    await create({ userId: user.id, transactionType: TransactionType.LEND });
    await create({ userId: generateID() });

    const userRecords = await Record.find({ userId: user.id });
    const allRecords = await Record.find();

    const lendRes = await request
      .get(`/api/records?trxType=${TransactionType.LEND}`)
      .set('Cookie', user.cookie);

    const borrowRes = await request
      .get(`/api/records?trxType=${TransactionType.BORROW}`)
      .set('Cookie', user.cookie);

    expect(allRecords).toHaveLength(6);
    expect(userRecords).toHaveLength(5);
    expect(lendRes.body).toHaveLength(2);
    expect(borrowRes.body).toHaveLength(3);
  });
});
