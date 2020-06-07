import { Subjects } from '../subjects';

export interface RecordUpdatedEvent {
  subject: Subjects.RECORD_UPDATED;
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
