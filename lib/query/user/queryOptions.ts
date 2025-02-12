import {
  GET_ALL_ITEMS_QK, GET_ALL_ROLES_QK,
  GET_ALL_USERS_QK
} from "@lib/query/user/queryKeys";
import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {UserController} from "@/controllers/user/User.controller";

export interface IGetUsers {
  roles?: string[];
  pagination: IPagination;
}

export const getAllItemsOptions = (paginationDto: IPagination) => queryOptions({
  queryKey: [GET_ALL_ITEMS_QK, paginationDto.pageNumber, paginationDto.pageSize],
  queryFn: () => UserController.getAllItems(paginationDto),
  staleTime: 10 * 1000,
  placeholderData: keepPreviousData,
});

export const getAllRoles = () => queryOptions({
  queryKey: [GET_ALL_ROLES_QK],
  queryFn: () => UserController.getAllRoles(),
  staleTime: 10 * 1000,
})

export const getAllUsersOption = ({
  roles = [],
  pagination,
}: IGetUsers) => queryOptions({
  queryKey: [GET_ALL_USERS_QK, roles, pagination.pageNumber, pagination.pageSize],
  queryFn: () => UserController.getAllUsers({
    roles,
    pagination
  }),
  staleTime: 10 * 1000,
  placeholderData: keepPreviousData,
});
