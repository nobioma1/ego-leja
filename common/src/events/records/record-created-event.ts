import { Subjects } from '../subjects';
import { RecordType } from '../../types/record-type';

export interface RecordCreatedEvent {
  subject: Subjects.RECORD_CREATED;
  data: {
    id: string;
    amount: number;
    description: string;
    dueDate: Date;
    isBadDebt: boolean;
    name: string;
    recordType: RecordType;
    userId: string;
  };
}
