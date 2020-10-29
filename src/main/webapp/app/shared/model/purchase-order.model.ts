import { ILocation } from 'app/shared/model/location.model';

export interface IPurchaseOrder {
  id?: number;
  desiredQuantity?: number;
  desiredQuality?: string;
  location?: ILocation;
}

export const defaultValue: Readonly<IPurchaseOrder> = {};
