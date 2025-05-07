import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {TaskController} from "@/controllers/manager/Task.controller";
import {GET_ALL_USER_TASKS_QK, GET_ASSIGNMENTS_QK} from "@lib/query/manager/queryKeys";
import {GET_ITEMS_HISTORIES_QK} from "@lib/query/inventory-manager/queryKeys";
import {ItemController} from "@/controllers/inventory-manager/Item.controller";

export interface IGetAllUserTasks {
  userEmail: string;
  month?: number;
  year?: number;
}
export const getAllUserTasksOptions = ({
  userEmail,
  month = -1,
  year = -1,
}: IGetAllUserTasks) => queryOptions({
  queryKey: [GET_ALL_USER_TASKS_QK, userEmail, month, year],
  queryFn: () => TaskController.getAllUserTasks({
    userEmail,
    month,
    year,
  }),
  staleTime: 10 * 1000,
})

export const getAssignments = (paginationDto: IPagination) => queryOptions({
  queryKey: [GET_ASSIGNMENTS_QK, paginationDto.pageNumber, paginationDto.pageSize],
  queryFn: () => TaskController.getAssignments(paginationDto),
  placeholderData: keepPreviousData,
  staleTime: 10 * 1000,
})
