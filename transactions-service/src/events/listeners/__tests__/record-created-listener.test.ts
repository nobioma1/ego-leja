import { Message } from 'node-nats-streaming';
import { RecordCreatedEvent, RecordType } from '@ego-leja/common';

import { RecordCreatedListener } from '../record-created-listener';
import { natsWrapper } from '../../../utils/nats-wrapper';
import { Record } from '../../../models/record';
import { generateID } from '../../../test/helpers/generate-id';

const setup = async () => {
  const listener = new RecordCreatedListener(natsWrapper.client);

  const data: RecordCreatedEvent['data'] = {
    id: generateID(),
    amount: 2000,
    description: '',
    dueDate: new Date(),
    isBadDebt: false,
    name: 'SomTest Env',
    recordType: RecordType.BORROW,
    userId: generateID(),
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

describe('Record Created Listener', () => {
  it('creates and saves a new record', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const ticket = await Record.findById(data.id);

    expect(ticket).toBeDefined();
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
