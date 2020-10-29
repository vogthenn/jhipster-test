import { ILocation } from 'app/shared/model/location.model';

export interface IWarehouse {
  id?: number;
  bagCapacity?: number;
  name?: string;
  location?: ILocation;
}

export const defaultValue: Readonly<IWarehouse> = {};
