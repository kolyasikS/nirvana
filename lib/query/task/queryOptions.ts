import {queryOptions} from "@tanstack/react-query";
import {TaskController} from "@/controllers/manager/Task.controller";
import {GET_ALL_USER_TASKS_QK} from "@lib/query/task/queryKeys";

export interface IGetAllUserTasks {
  userEmail: string;
}
export const getAllUserTasksOptions = ({
  userEmail
}: IGetAllUserTasks) => queryOptions({
  queryKey: [GET_ALL_USER_TASKS_QK, userEmail],
  queryFn: () => TaskController.getAllUserTasks({ userEmail }),
  staleTime: 10 * 1000,
})
