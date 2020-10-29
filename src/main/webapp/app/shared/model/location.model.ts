import { IRegion } from 'app/shared/model/region.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  coordinates?: string;
  region?: IRegion;
}

export const defaultValue: Readonly<ILocation> = {};
