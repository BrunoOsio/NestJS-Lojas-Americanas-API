export class FindProductOptions {
  id?: number;
  name?: string;
  hasOwner?: boolean;
  ownerId?: number;
  hasCategory?: boolean;
  categoryId?: number;
}

export enum ProductFindParameter{
  IS_NULL = null
}