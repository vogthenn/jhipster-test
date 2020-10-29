import { ITransaction } from 'app/shared/model/transaction.model';
import { QualityGrade } from 'app/shared/model/enumerations/quality-grade.model';

export interface IBag {
  id?: number;
  quality?: QualityGrade;
  bags?: ITransaction;
}

export const defaultValue: Readonly<IBag> = {};
