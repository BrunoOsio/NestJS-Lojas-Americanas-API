export class FindProductOptions {
  id?: number;
  name?: string;
  hasOwner?: boolean;
  ownerId?: number;
}

export enum ProductFindParameter{
  IS_NULL = null
}