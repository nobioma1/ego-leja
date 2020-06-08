import { Publisher, Subjects, RecordUpdatedEvent } from '@ego-leja/common';

export class RecordUpdatedPublisher extends Publisher<RecordUpdatedEvent> {
  subject: Subjects.RECORD_UPDATED = Subjects.RECORD_UPDATED;
}
