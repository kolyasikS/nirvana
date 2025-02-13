import {queryOptions} from "@tanstack/react-query";
import {TaskController} from "@/controllers/manager/Task.controller";
import {GET_ALL_USER_TASKS_QK} from "@lib/query/manager/queryKeys";

export interface IGetAllUserTasks {
  userEmail: string;
  month?: number;
  year?: number;
}
export const getAllUserTasksOptions = ({
  userEmail,
  month,
  year
}: IGetAllUserTasks) => queryOptions({
  queryKey: [GET_ALL_USER_TASKS_QK, userEmail, month, year],
  queryFn: () => TaskController.getAllUserTasks({
    userEmail,
    month,
    year
  }),
  staleTime: 10 * 1000,
})
