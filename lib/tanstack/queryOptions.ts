import {AdminController} from "@/controllers/admin/Admin.controller";
import {
  ALL_USERS_QK
} from "@lib/tanstack/queryKeys";
import {queryOptions} from "@tanstack/react-query";

export const allUsersOption = queryOptions({
  queryKey: [ALL_USERS_QK],
  queryFn: AdminController.getAllUsers,
  staleTime: 10 * 1000,
})