import { ILocation } from 'app/shared/model/location.model';

export interface ITransaction {
  id?: number;
  location?: ILocation;
}

export const defaultValue: Readonly<ITransaction> = {};
