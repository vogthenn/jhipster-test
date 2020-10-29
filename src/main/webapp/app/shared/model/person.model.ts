import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';

export interface IPerson {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: string;
  salary?: number;
  commissionPct?: number;
  location?: ILocation;
}

export const defaultValue: Readonly<IPerson> = {};
