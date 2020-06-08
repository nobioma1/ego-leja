import { Publisher, Subjects, RecordDeletedEvent } from '@ego-leja/common';

export class RecordDeletedPublisher extends Publisher<RecordDeletedEvent> {
  subject: Subjects.RECORD_DELETED = Subjects.RECORD_DELETED;
}
