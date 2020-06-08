import { Subjects } from '../subjects';
import { RecordType } from '../../types/record-type';

export interface RecordUpdatedEvent {
  subject: Subjects.RECORD_UPDATED;
  data: {
    id: string;
    description: string;
    dueDate: Date;
    isBadDebt: boolean;
    name: string;
    userId: string;
  };
}
