import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {
  GET_ITEMS_HISTORIES_QK,
  GET_LACKING_ITEMS_QK,
} from "@lib/query/inventory-manager/queryKeys";
import {ItemController} from "@/controllers/inventory-manager/Item.controller";

export const getLackingItems = () => queryOptions({
  queryKey: [GET_LACKING_ITEMS_QK],
  queryFn: () => ItemController.getLackingItems(),
})

export const getItemHistories = (paginationDto: IPagination) => queryOptions({
  queryKey: [GET_ITEMS_HISTORIES_QK, paginationDto.pageNumber, paginationDto.pageSize],
  queryFn: () => ItemController.getItemHistory(paginationDto),
  placeholderData: keepPreviousData,
})
