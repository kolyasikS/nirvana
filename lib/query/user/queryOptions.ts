import {
  GET_ALL_ITEMS_QK, GET_ALL_ROLES_QK,
  GET_ALL_USERS_QK
} from "@lib/query/user/queryKeys";
import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {UserController} from "@/controllers/user/User.controller";
import {AMOUNT_IN_PAGE} from "@lib/constants";

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
}: IGetUsers) => {
  const queryKey: any[] = [GET_ALL_USERS_QK];
  if (roles.length > 0) {
    queryKey.push(roles);
  }
  queryKey.push(pagination?.pageNumber ?? 1);
  queryKey.push(pagination?.pageSize ?? AMOUNT_IN_PAGE);

  return queryOptions({
    queryKey,
    queryFn: () => UserController.getAllUsers({
      roles,
      pagination
    }),
    staleTime: 10 * 1000,
    placeholderData: keepPreviousData,
  });
};
