import { IBag } from 'app/shared/model/bag.model';

export interface IGrain {
  id?: number;
  name?: string;
  contentType?: IBag;
}

export const defaultValue: Readonly<IGrain> = {};
