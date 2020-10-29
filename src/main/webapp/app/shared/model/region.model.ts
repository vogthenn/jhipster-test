import { ICountry } from 'app/shared/model/country.model';

export interface IRegion {
  id?: number;
  regionName?: string;
  country?: ICountry;
}

export const defaultValue: Readonly<IRegion> = {};
