import { Message } from 'node-nats-streaming';

import { Subjects, Listener, RecordDeletedEvent } from '@ego-leja/common';
import { queueGroupName } from './queue-group-name';
import { Record } from '../../models/record';
import { Transaction } from '../../models/transaction';

export class RecordDeletedListener extends Listener<RecordDeletedEvent> {
  subject: Subjects.RECORD_DELETED = Subjects.RECORD_DELETED;
  queueGroupName = queueGroupName;

  async onMessage(data: RecordDeletedEvent['data'], msg: Message) {
    const record = await Record.findOne({
      _id: data.id,
      userId: data.userId,
    });

    if (!record) {
      throw new Error('Record does not exist');
    }

    await Transaction.deleteMany({
      userId: data.userId,
      record: record._id,
    });
    await record.remove();

    msg.ack();
  }
}
