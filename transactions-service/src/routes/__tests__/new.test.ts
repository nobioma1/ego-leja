import supertest from 'supertest';

import { server } from '../../api/server';
import { generateID } from '../../test/helpers/generate-id';
import { createRecord } from '../../test/helpers/create-record';
import { Transaction } from '../../models/transaction';
import { Record } from '../../models/record';

const request = supertest(server);

describe('[POST /api/transactions/recordId] NEW Transaction', () => {
  it('returns an error 400 if fields are not valid', async () => {
    const user = global.signin();
    const record = await createRecord({ userId: user.id });

    await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({})
      .expect(400);

    await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({
        amount: 999999999.5,
      })
      .expect(400);

    await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({
        amount: 0,
      })
      .expect(400);
  });

  it('require authentication to make transaction', async () => {
    await request
      .post(`/api/transactions/${generateID()}`)
      .send({})
      .expect(401);
  });

  it('will not create a new transaction if trx amount is greater the record payable amount', async () => {
    const user = global.signin();
    const record = await createRecord({
      userId: user.id,
      amount: 3000,
      payable: 1200,
    });

    const res = await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({
        amount: 1500,
      });

    expect(res.status).toBe(400);
    expect(res.body.errors[0]).toEqual({
      message: 'Amount is greater than deductible',
    });
  });

  it('return 404 if record for user is not found', async () => {
    await createRecord({ userId: generateID() });
    const user = global.signin();
    const res = await request
      .post(`/api/transactions/${generateID()}`)
      .set('Cookie', user.cookie)
      .send({
        amount: 3005,
      });

    const records = await Record.find();

    expect(res.status).toBe(404);
    expect(records).toHaveLength(1);
  });

  it('create a new transaction for a record and update payable amount', async () => {
    const payload = {
      amount: 500,
    };

    const user = global.signin(); // Sign In User

    // Create Records
    await createRecord({ userId: generateID() });
    await createRecord({ userId: user.id });

    // Create record for transactions
    const record = await createRecord({
      id: generateID(),
      userId: user.id,
      amount: 3000,
      payable: 1000,
    });

    let records = await Record.find();
    let trxs = await Transaction.find();

    expect(records).toHaveLength(3);
    expect(trxs).toHaveLength(0);

    const res = await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send(payload);

    trxs = await Transaction.find();

    expect(trxs).toHaveLength(1);

    const newRecord = await Record.findById(record.id);

    expect(res.status).toBe(201);
    expect(newRecord!.amount).toEqual(record.amount);
    expect(newRecord!.payable).toEqual(record.payable - payload.amount);
    expect(res.body.userId).toEqual(user.id);
    expect(res.body.amount).toEqual(payload.amount);
    expect(res.body.record.payable).toEqual(record.payable - payload.amount);
  });

  it('Keep record of multiple transactions to a record for user', async () => {
    const user = global.signin(); // Sign In User

    // xUser Signin
    const xUser = global.signin();
    // Create XUser Record
    const xRec = await createRecord({ userId: xUser.id, amount: 200 });
    // Make transaction for xUser
    await request
      .post(`/api/transactions/${xRec.id}`)
      .set('Cookie', xUser.cookie)
      .send({ amount: 100 })
      .expect(201);

    // Create user Record
    await createRecord({ userId: user.id });
    // Create user record for transactions
    const record = await createRecord({
      id: generateID(),
      userId: user.id,
      amount: 15000,
      payable: 15000,
    });
    expect(record.payable).toEqual(15000);

    let records = await Record.find();
    let trxs = await Transaction.find();

    expect(records).toHaveLength(3);
    expect(trxs).toHaveLength(1);

    const firstTrx = await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({ amount: 2000 });

    expect(firstTrx.status).toBe(201);
    expect(firstTrx.body.amount).toEqual(2000);
    expect(firstTrx.body.record.id).toEqual(record.id);
    expect(firstTrx.body.record.payable).toEqual(13000);

    const secondTrx = await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({ amount: 6380 });

    expect(secondTrx.status).toBe(201);
    expect(secondTrx.body.amount).toEqual(6380);
    expect(secondTrx.body.record.id).toEqual(record.id);
    expect(secondTrx.body.record.payable).toEqual(6620);

    const thirdTrx = await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({ amount: 6620 });

    expect(thirdTrx.status).toBe(201);
    expect(thirdTrx.body.amount).toEqual(6620);
    expect(thirdTrx.body.record.id).toEqual(record.id);
    expect(thirdTrx.body.record.payable).toEqual(0);

    trxs = await Transaction.find();
    expect(trxs).toHaveLength(4);

    let userTrxs = await Transaction.find({ userId: user.id });
    expect(userTrxs).toHaveLength(3);

    const updatedRecord = await Record.findById(record.id);
    expect(updatedRecord!.payable).toEqual(0);

    await request
      .post(`/api/transactions/${record.id}`)
      .set('Cookie', user.cookie)
      .send({ amount: 1 })
      .expect(400);
  });
});
