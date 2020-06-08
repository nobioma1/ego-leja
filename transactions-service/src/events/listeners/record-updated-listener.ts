import { Message } from 'node-nats-streaming';

import { Subjects, Listener, RecordUpdatedEvent } from '@ego-leja/common';
import { queueGroupName } from './queue-group-name';
import { Record } from '../../models/record';

export class RecordUpdatedListener extends Listener<RecordUpdatedEvent> {
  subject: Subjects.RECORD_UPDATED = Subjects.RECORD_UPDATED;
  queueGroupName = queueGroupName;

  async onMessage(data: RecordUpdatedEvent['data'], msg: Message) {
    const record = await Record.findById(data.id);

    if (!record) {
      throw new Error('Record does not exist');
    }

    const recordUpdate = record.set({
      name: data.name,
      dueDate: data.dueDate,
      description: data.description,
      isBadDebt: data.isBadDebt,
    });
    await recordUpdate.save();

    msg.ack();
  }
}
