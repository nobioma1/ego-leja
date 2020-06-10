import { Transaction, TransactionDoc } from '../models/transaction';
import { RecordDoc } from '../models/record';

export class TransactionService {
  static async getTransactions(params: {
    record: RecordDoc;
  }): Promise<TransactionDoc[]> {
    const transactions = await Transaction.find(params);

    return transactions;
  }

  static async getRecentTransactions(
    userId: string
  ): Promise<TransactionDoc[]> {
    // 5 recent transactions
    const recentTransactions = await Transaction.find({
      userId,
    })
      .limit(5)
      .sort('-createdAt')
      .populate('record', {
        name: 1,
        amount: 1,
        payable: 1,
        dueDate: 1,
        recordType: 1,
        createdAt: 1,
      });
    return recentTransactions;
  }

  static async newTransaction(params: {
    amount: number;
    userId: string;
    record: RecordDoc;
  }): Promise<{}> {
    const newTrx = Transaction.build(params);
    await newTrx.save();

    params.record.set({
      payable: params.record.payable - newTrx.amount,
    });
    await params.record.save();

    return newTrx;
  }
}
