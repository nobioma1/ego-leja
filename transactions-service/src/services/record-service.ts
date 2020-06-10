import mongoose from 'mongoose';
import { Record } from '../models/record';

export class RecordService {
  static async getRecordSummary(userId: string) {
    const date = new Date();
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const [summary] = await Record.aggregate([
      {
        $facet: {
          // sum of user record payable grouped by TYPE: LEND | BORROW
          totalByRecordType: [
            {
              $match: { userId: mongoose.Types.ObjectId(userId) },
            },
            {
              $group: {
                _id: '$recordType',
                totalAmountPayable: { $sum: '$payable' },
                totalRecords: { $sum: '$amount' },
              },
            },
            {
              $project: {
                _id: 0,
                recordType: '$_id',
                totalAmountPayable: 1,
                totalRecords: 1,
              },
            },
          ],
          // sum of user records for the current month
          totalMonthByRecordType: [
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
                createdAt: {
                  $gte: monthStart,
                  $lt: monthEnd,
                },
              },
            },
            {
              $group: {
                _id: '$recordType',
                totalAmountPayable: { $sum: '$payable' },
                totalRecords: { $sum: '$amount' },
              },
            },
            {
              $project: {
                _id: 0,
                recordType: '$_id',
                totalAmountPayable: 1,
                totalRecords: 1,
              },
            },
          ],
          // Add to pipeline, calculate bad debt
          totalBadDebtByType: [
            {
              $match: {
                userId: mongoose.Types.ObjectId(userId),
                isBadDebt: true,
              },
            },
            {
              $group: {
                _id: '$recordType',
                totalAmountPayable: { $sum: '$payable' },
                totalRecords: { $sum: '$amount' },
              },
            },
            {
              $project: {
                _id: 0,
                recordType: '$_id',
                totalAmountPayable: 1,
                totalRecords: 1,
              },
            },
          ],
        },
      },
    ]);

    return summary;
  }
}
