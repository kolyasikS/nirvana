import {queryOptions} from "@tanstack/react-query";
import {GET_ALL_WORKER_TASKS_QK} from "@lib/query/worker/queryKeys";
import {TaskController} from "@/controllers/worker/Task.controller";

export const getAllWorkerTasksOptions = () => queryOptions({
  queryKey: [GET_ALL_WORKER_TASKS_QK],
  queryFn: () => TaskController.getAllWorkerTasks(),
  staleTime: 10 * 1000,
})
