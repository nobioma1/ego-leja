import { Message } from 'node-nats-streaming';
import { RecordDeletedEvent } from '@ego-leja/common';

import { natsWrapper } from '../../../utils/nats-wrapper';
import { generateID } from '../../../test/helpers/generate-id';
import { createRecord } from '../../../test/helpers/create-record';
import { RecordDeletedListener } from '../record-deleted-listener';
import { Transaction } from '../../../models/transaction';

const setup = async () => {
  const record = await createRecord({ userId: generateID(), amount: 30000 });

  await Transaction.build({
    record,
    amount: 1000,
    userId: record.userId,
  }).save();

  await Transaction.build({
    record,
    amount: 20000,
    userId: record.userId,
  }).save();

  const listener = new RecordDeletedListener(natsWrapper.client);

  const data: RecordDeletedEvent['data'] = {
    id: record.id,
    userId: record.userId,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, record };
};

describe('Record Deleted Listener', () => {
  it('delete an existing record with all its transactions', async () => {
    const { listener, data, msg, record } = await setup();
    let transactions;

    transactions = await Transaction.find({
      userId: record.userId,
      record: record._id,
    });
    expect(transactions).toHaveLength(2);

    await listener.onMessage(data, msg);

    transactions = await Transaction.find({
      userId: record.userId,
      record: record._id,
    });
    expect(transactions).toHaveLength(0);
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
