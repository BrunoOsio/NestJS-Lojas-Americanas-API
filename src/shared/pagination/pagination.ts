import { PaginationOptions } from "./pagination.options";

const DEFAULT_LIMIT = 10;

const pagination = (page: number, limit = DEFAULT_LIMIT): PaginationOptions => {
  const offset = (page - 1) * limit;

  return {take: limit, skip: offset}
}

export default pagination;