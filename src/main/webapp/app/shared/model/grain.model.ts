import { IBag } from 'app/shared/model/bag.model';

export interface IGrain {
  id?: number;
  name?: string;
  contentType?: IBag;
  name?: IBag;
}

export const defaultValue: Readonly<IGrain> = {};
