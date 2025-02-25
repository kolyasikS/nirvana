import {axios} from "@lib/axios";
import {ResponseError} from "@lib/errors";
import {IGetAllWorkerTasks} from "@lib/query/worker/queryOptions";

export class TaskController {
  static async markAsCompleted({ assignmentToUserId }: IMarkAsCompletedTask): Promise<IResponse> {
    try {
      const result = await axios.put(`/assignmentsToUsers/markAsCompleted`, {
        assignmentToUserId
      });

      return {
        message: 'Task has been marked as completed successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async getAllWorkerTasks({ month, year }: IGetAllWorkerTasks): Promise<IResponse> {
    try {
      let queryParamsString = ``;
      if (month !== -1) {
        queryParamsString += `month=${month}&`;
      }
      if (month !== -1) {
        queryParamsString += `year=${year}`;
      }

      const { data } = await axios.get(`/assignmentsToUsers/allOwn?${queryParamsString}`);
      return {
        error: false,
        message: 'Tasks were fetched successfully.',
        data
      }
    } catch (error: any) {
      if (error.status === 404) {
        return {
          error: false,
          message: 'Tasks were fetched successfully.',
          data: [],
        }
      } else {
        console.error(error);
        throw ResponseError.createResponseError(error);
      }
    }
  }
}