import { Pagination } from "@/_types";

export const formatPagination = (pagination: Pagination) => {
  const prevPage = pagination.page - 1;
  const nextPage = pagination.page + 1;
  const maxPage = Math.ceil(pagination.total / pagination.pageSize)
  return {
    prevPage,
    nextPage,
    maxPage,
    ...pagination
  }
}

export default formatPagination