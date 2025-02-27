import {queryOptions} from "@tanstack/react-query";
import {GET_ALL_WORKER_TASKS_QK} from "@lib/query/worker/queryKeys";
import {TaskController} from "@/controllers/worker/Task.controller";

export interface IGetAllWorkerTasks {
  month?: number;
  year?: number;
}

export const getAllWorkerTasksOptions = ({
  month,
  year,
}: IGetAllWorkerTasks) => queryOptions({
  x: (() => {
    console.log(GET_ALL_WORKER_TASKS_QK, month, year);
  })(),
  queryKey: [GET_ALL_WORKER_TASKS_QK, month, year],
  queryFn: () => TaskController.getAllWorkerTasks({
    month,
    year
  }),
  staleTime: 30 * 1000,
})
