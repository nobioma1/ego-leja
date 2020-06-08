import supertest from 'supertest';

import { server } from '../../api/server';
import { RecordType } from '@ego-leja/common';
import { Record } from '../../models/record';
import { generateID } from '../../test/helpers/generate-id';
import { natsWrapper } from '../../utils/nats-wrapper';

const request = supertest(server);

const create = async (userId: string) => {
  const record = Record.build({
    name: 'Trinna Trip',
    recordType: RecordType.BORROW,
    amount: 30000,
    description: 'Some description',
    isBadDebt: false,
    dueDate: new Date(),
    userId,
  });
  await record.save();

  return record;
};

describe('[PUT /api/records] UPDATE New Record', () => {
  it('returns an error 400 if fields are not valid', async () => {
    const user = global.signin();
    const record = await create(user.id);
    await request
      .put(`/api/records/${record.id}`)
      .set('Cookie', user.cookie)
      .send({
        name: '',
        recordType: '',
        amount: '',
        description: 'string',
        isBadDebt: false,
      })
      .expect(400);

    await request
      .put(`/api/records/${record.id}`)
      .set('Cookie', user.cookie)
      .send({
        name: '',
        amount: '',
        description: 'string',
        isBadDebt: false,
      })
      .expect(400);

    await request
      .put(`/api/records/${record.id}`)
      .set('Cookie', user.cookie)
      .send({
        name: 'Johnny Loe',
        recordType: 'WRONGTYPE',
        amount: '2500.0',
        description: 'Some description',
        isBadDebt: false,
      })
      .expect(400);
  });

  it('require authentication to create a record', async () => {
    await request
      .put(`/api/records/${generateID()}`)
      .send({
        name: 'Johnny Loe',
        description: 'Some description',
        isBadDebt: false,
      })
      .expect(401);
  });

  it('returns a 404 if record is not found', async () => {
    await create(generateID());
    await request
      .put(`/api/records/${generateID()}`)
      .set('Cookie', global.signin().cookie)
      .send({
        name: 'Trinna Trip',
        description: 'Some description',
        isBadDebt: false,
      })
      .expect(404);
  });

  it('return 404 if record id is not among user records collection', async () => {
    const record = await create(generateID());
    await request
      .put(`/api/records/${record.id}`)
      .set('Cookie', global.signin().cookie)
      .send({
        name: 'Trinna Trip',
        description: 'Some description',
        isBadDebt: false,
      })
      .expect(404);
  });

  it('updates an existing record and send response', async () => {
    const user = global.signin();
    const record = await create(user.id);

    const res = await request
      .put(`/api/records/${record.id}`)
      .set('Cookie', user.cookie)
      .send({
        name: 'Sunda Grams',
        dueDate: new Date(),
        description: 'Some description',
        isBadDebt: false,
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toEqual('Sunda Grams');
    expect(res.body.id).toEqual(String(record.id));
    expect(res.body.amount).toEqual(record.amount);
    expect(res.body.recordType).toEqual(record.recordType);
  });

  it('publishes an event', async () => {
    const user = global.signin();
    const record = await create(user.id);

    await request
      .put(`/api/records/${record.id}`)
      .set('Cookie', user.cookie)
      .send({
        name: 'Sunda Grams',
        dueDate: new Date(),
        description: 'Some description',
        isBadDebt: false,
      });

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
