import { Publisher, RecordCreatedEvent, Subjects } from '@ego-leja/common';

export class RecordCreatedPublisher extends Publisher<RecordCreatedEvent> {
  subject: Subjects.RECORD_CREATED = Subjects.RECORD_CREATED;
}
