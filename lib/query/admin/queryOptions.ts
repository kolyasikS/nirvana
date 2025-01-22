import {AdminController} from "@/controllers/admin/Admin.controller";
import {
  GET_USER_QK
} from "@lib/query/admin/queryKeys";
import {queryOptions} from "@tanstack/react-query";

export interface IGetUser {
  userId: string;
}

export const getUserOption = ({ userId }: IGetUser) => queryOptions({
  queryKey: [GET_USER_QK, userId],
  queryFn: () => AdminController.getUser({ userId }),
  staleTime: 10 * 1000,
});