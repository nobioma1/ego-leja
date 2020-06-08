import { Message } from 'node-nats-streaming';

import { RecordCreatedEvent, Subjects, Listener } from '@ego-leja/common';
import { queueGroupName } from './queue-group-name';
import { Record } from '../../models/record';

export class RecordCreatedListener extends Listener<RecordCreatedEvent> {
  subject: Subjects.RECORD_CREATED = Subjects.RECORD_CREATED;
  queueGroupName = queueGroupName;

  async onMessage(data: RecordCreatedEvent['data'], msg: Message) {
    const record = Record.build(data);
    await record.save();

    msg.ack();
  }
}
