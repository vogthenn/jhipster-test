export interface IPurchaseOrder {
  id?: number;
  desiredQuantity?: number;
  desiredQuality?: string;
}

export const defaultValue: Readonly<IPurchaseOrder> = {};
