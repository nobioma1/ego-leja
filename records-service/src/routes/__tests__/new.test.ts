import supertest from 'supertest';

import { server } from '../../api/server';
import { TransactionType } from '../../models/types/transaction-type';

const request = supertest(server);

describe('[POST /api/records] Create New Record', () => {
  it('returns an error 400 if fields are not valid', async () => {
    await request
      .post('/api/records')
      .set('Cookie', global.signin().cookie)
      .send({
        name: '',
        transactionType: '',
        amount: '',
        description: 'string',
        isBadDebt: false,
      })
      .expect(400);

    await request
      .post('/api/records')
      .set('Cookie', global.signin().cookie)
      .send({
        name: '',
        amount: '',
        description: 'string',
        isBadDebt: false,
      })
      .expect(400);

    await request
      .post('/api/records')
      .set('Cookie', global.signin().cookie)
      .send({
        name: 'Johnny Loe',
        transactionType: 'WRONGTYPE',
        amount: '2500.0',
        description: 'Some description',
        isBadDebt: false,
      })
      .expect(400);
  });

  it('require authentication to create a record', async () => {
    await request
      .post('/api/records')
      .send({
        name: 'Johnny Loe',
        transactionType: TransactionType.LEND,
        amount: 2500.0,
        description: 'Some description',
        isBadDebt: false,
      })
      .expect(401);
  });

  it('creates a new record and send response', async () => {
    const user = global.signin();

    const res = await request
      .post('/api/records')
      .set('Cookie', user.cookie)
      .send({
        name: 'Trinna Trip',
        transactionType: TransactionType.BORROW,
        amount: 30000,
        description: 'Some description',
        isBadDebt: false,
      });

    expect(res.status).toBe(201);
    expect(res.body.userId).toBe(user.id);
  });
});
