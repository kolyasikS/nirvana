import {queryOptions} from "@tanstack/react-query";
import {
  GET_LACKING_ITEMS_QK,
} from "@lib/query/inventory-manager/queryKeys";
import {ItemController} from "@/controllers/inventory-manager/Item.controller";

export const getLackingItems = () => queryOptions({
  queryKey: [GET_LACKING_ITEMS_QK],
  queryFn: () => ItemController.getLackingItems(),
  staleTime: 0,
})
