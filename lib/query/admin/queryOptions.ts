import {AdminController} from "@/controllers/admin/Admin.controller";
import {
  GET_ALL_USERS_QK
} from "@lib/query/admin/queryKeys";
import {queryOptions} from "@tanstack/react-query";

export interface IGetUser {
  userId: string;
}

export const getUserOption = ({ userId }: IGetUser) => queryOptions({
  queryKey: [GET_ALL_USERS_QK, userId],
  queryFn: () => AdminController.getUser({ userId }),
  staleTime: 10 * 1000,
});