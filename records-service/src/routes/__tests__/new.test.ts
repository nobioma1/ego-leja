import supertest from 'supertest';

import { server } from '../../api/server';
import { RecordType } from '../../models/types/record-type';

const request = supertest(server);

describe('[POST /api/records] CREATE New Record', () => {
  it('returns an error 400 if fields are not valid', async () => {
    await request
      .post('/api/records')
      .set('Cookie', global.signin().cookie)
      .send({
        name: '',
        recordType: '',
        amount: '',
        description: 'string',
        dueDate: new Date(),
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
        recordType: 'WRONGTYPE',
        amount: '2500.0',
        description: 'Some description',
        isBadDebt: false,
        dueDate: '',
      })
      .expect(400);
  });

  it('require authentication to create a record', async () => {
    await request
      .post('/api/records')
      .send({
        name: 'Johnny Loe',
        recordType: RecordType.LEND,
        amount: 2500.0,
        description: 'Some description',
        isBadDebt: false,
        dueDate: new Date(),
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
        recordType: RecordType.BORROW,
        amount: 30000,
        description: 'Some description',
        isBadDebt: false,
        dueDate: new Date(),
      });

    expect(res.status).toBe(201);
    expect(res.body.userId).toBe(user.id);
  });
});
