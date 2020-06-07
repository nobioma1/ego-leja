import { Subjects } from '../subjects';

export interface RecordCreatedEvent {
  subject: Subjects.RECORD_CREATED;
  data: {
    id: string;
    amount: number;
    description: string;
    dueDate: Date;
    isBadDebt: boolean;
    name: string;
    recordType: string;
    userId: string;
    createdAt: Date;
  };
}
