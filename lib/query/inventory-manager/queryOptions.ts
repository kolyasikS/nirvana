import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {
  GET_ITEMS_HISTORIES_QK,
  GET_LACKING_ITEMS_QK, GET_MOST_POPULAR_ITEM_QK,
} from "@lib/query/inventory-manager/queryKeys";
import {ItemController} from "@/controllers/inventory-manager/Item.controller";

export const getLackingItems = () => queryOptions({
  queryKey: [GET_LACKING_ITEMS_QK],
  queryFn: () => ItemController.getLackingItems(),
})

export const getItemHistories = (getItemHistoryDto: IGetItemHistory) => queryOptions({
  queryKey: getItemHistoryDto?.pagination
    ? [GET_ITEMS_HISTORIES_QK, getItemHistoryDto?.pagination.pageNumber, getItemHistoryDto?.pagination.pageSize]
    : [GET_ITEMS_HISTORIES_QK, getItemHistoryDto.month],
  queryFn: () => ItemController.getItemHistory(getItemHistoryDto),
  placeholderData: keepPreviousData,
})

export const getMostPopularItem = () => queryOptions({
  queryKey: [GET_MOST_POPULAR_ITEM_QK],
  queryFn: () => ItemController.getMostPopularItem(),
})
