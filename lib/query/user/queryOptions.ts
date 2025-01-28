import {
  GET_ALL_ITEMS_QK,
  GET_ALL_USERS_QK
} from "@lib/query/user/queryKeys";
import {queryOptions} from "@tanstack/react-query";
import {UserController} from "@/controllers/user/User.controller";

export interface IGetUsers {
  roles?: string[];
}

export const getAllItemsOptions = () => queryOptions({
  queryKey: [GET_ALL_ITEMS_QK],
  queryFn: () => UserController.getAllItems(),
  staleTime: 10 * 1000,
})

export const getAllUsersOption = ({
  roles = [],
}: IGetUsers) => queryOptions({
  queryKey: [GET_ALL_USERS_QK, roles],
  queryFn: () => UserController.getAllUsers({roles}),
  staleTime: 10 * 1000,
})
