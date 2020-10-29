import { ICountry } from 'app/shared/model/country.model';
import { IPerson } from 'app/shared/model/person.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  coordinates?: string;
  country?: ICountry;
  person?: IPerson;
}

export const defaultValue: Readonly<ILocation> = {};
