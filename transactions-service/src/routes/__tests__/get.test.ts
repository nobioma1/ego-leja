import supertest from 'supertest';

import { server } from '../../api/server';
import { generateID } from '../../test/helpers/generate-id';
import { createRecord } from '../../test/helpers/create-record';
import { Transaction } from '../../models/transaction';
import { Record } from '../../models/record';

const request = supertest(server);

describe('[GET /api/transactions/recordId] GET all record transactions', () => {
  it('require authentication to make transaction', async () => {
    await request.get(`/api/transactions/${generateID()}`).expect(401);
  });

  it('return 404 if record for user is not found', async () => {
    await createRecord({ userId: generateID() });
    const user = global.signin();
    const res = await request
      .get(`/api/transactions/${generateID()}`)
      .set('Cookie', user.cookie);

    const records = await Record.find();

    expect(res.status).toBe(404);
    expect(records).toHaveLength(1);
  });

  it('Get all transactions for a record', async () => {
    const otherUser = global.signin();
    const otherUserRecord = await createRecord({
      userId: otherUser.id,
      amount: 200,
    });
    await request
      .post(`/api/transactions/${otherUserRecord.id}`)
      .set('Cookie', otherUser.cookie)
      .send({ amount: 100 })
      .expect(201);

    // Sign In User
    const user = global.signin();
    // Create user Record
    await createRecord({ userId: user.id });
    // Create user record for transactions
    const record = await createRecord({
      userId: user.id,
    });

    await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({ amount: 12300.53 })
      .expect(201);

    await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({ amount: 1000 })
      .expect(201);

    await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({ amount: 2380 })
      .expect(201);

    await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({ amount: 8620 })
      .expect(201);

    const trxs = await Transaction.find();
    expect(trxs).toHaveLength(5);

    const res = await request
      .get(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie);

    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(record.id);
    expect(res.body.transactions).toHaveLength(4);
  });

  it('returns an empty array if user has no transaction for record', async () => {
    const otherUser = global.signin();
    const otherUserRecord = await createRecord({ userId: otherUser.id });
    await request
      .post(`/api/transactions/${otherUserRecord.id}`)
      .set('Cookie', otherUser.cookie)
      .send({ amount: 100 })
      .expect(201);
    await request
      .post(`/api/transactions/${otherUserRecord.id}`)
      .set('Cookie', otherUser.cookie)
      .send({ amount: 500 })
      .expect(201);
    await request
      .post(`/api/transactions/${otherUserRecord.id}`)
      .set('Cookie', otherUser.cookie)
      .send({ amount: 550.8 })
      .expect(201);

    // Sign In User
    const user = global.signin();
    // Create user Record
    const record = await createRecord({
      userId: user.id,
    });

    const trxs = await Transaction.find();
    expect(trxs).toHaveLength(3);

    const res = await request
      .get(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie);

    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(record.id);
    expect(res.body.transactions).toHaveLength(0);
  });
});
