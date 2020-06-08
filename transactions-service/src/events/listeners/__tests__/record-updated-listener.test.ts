import { Message } from 'node-nats-streaming';
import { RecordUpdatedEvent } from '@ego-leja/common';

import { natsWrapper } from '../../../utils/nats-wrapper';
import { Record } from '../../../models/record';
import { generateID } from '../../../test/helpers/generate-id';
import { RecordUpdatedListener } from '../record-updated-listener';
import { createRecord } from '../../../test/helpers/create-record';

const setup = async () => {
  const record = await createRecord({ userId: generateID() });
  const listener = new RecordUpdatedListener(natsWrapper.client);

  const data: RecordUpdatedEvent['data'] = {
    id: record.id,
    description: 'Added New Description',
    dueDate: record.dueDate,
    isBadDebt: true,
    name: 'Chan-Ge Name',
    userId: record.userId,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, record };
};

describe('Record Updated Listener', () => {
  it('updates an existing record', async () => {
    const { listener, data, msg, record } = await setup();

    await listener.onMessage(data, msg);

    const updatedRecord = await Record.findById(data.id);

    expect(record?.isBadDebt).toBeFalsy();
    expect(updatedRecord?.isBadDebt).toBeTruthy();
    expect(updatedRecord?.userId).toEqual(record.userId);
    expect(updatedRecord?.amount).toEqual(record.amount);
    expect(updatedRecord?.name).toEqual('Chan-Ge Name');
    expect(updatedRecord?.description).toEqual('Added New Description');
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
