import { ICountry } from 'app/shared/model/country.model';
import { IPerson } from 'app/shared/model/person.model';
import { ITransaction } from 'app/shared/model/transaction.model';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  coordinates?: string;
  country?: ICountry;
  person?: IPerson;
  location?: IPerson;
  location?: ITransaction;
  location?: IPurchaseOrder;
}

export const defaultValue: Readonly<ILocation> = {};
