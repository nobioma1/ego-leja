import { Subjects } from '../subjects';

export interface RecordDeletedEvent {
  subject: Subjects.RECORD_DELETED;
  data: {
    id: string;
    userId: string;
  };
}
