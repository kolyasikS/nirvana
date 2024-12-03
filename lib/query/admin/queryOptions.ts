import {AdminController} from "@/controllers/admin/Admin.controller";
import {
  GET_ALL_USERS_QK, GET_USER_QK
} from "@lib/query/admin/queryKeys";
import {queryOptions} from "@tanstack/react-query";

export const getAllUsersOption = queryOptions({
  queryKey: [GET_ALL_USERS_QK],
  queryFn: AdminController.getAllUsers,
  staleTime: 10 * 1000,
})

export const getUserOption = ({ userId }: GetUser) => queryOptions({
  queryKey: [GET_USER_QK, userId],
  queryFn: () => AdminController.getUser({ userId }),
  staleTime: 10 * 1000,
});