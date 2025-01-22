import {queryOptions} from "@tanstack/react-query";
import {
  GET_ALL_ITEMS_QK, GET_LACKING_ITEMS_QK,
} from "@lib/query/inventory-manager/queryKeys";
import {ItemController} from "@/controllers/inventory-manager/Item.controller";

export const getAllItemsOptions = () => queryOptions({
  queryKey: [GET_ALL_ITEMS_QK],
  queryFn: () => ItemController.getAllItems(),
  staleTime: 10 * 1000,
})

export const getLackingItems = () => queryOptions({
  queryKey: [GET_LACKING_ITEMS_QK],
  queryFn: () => ItemController.getLackingItems(),
  staleTime: 0,
})
