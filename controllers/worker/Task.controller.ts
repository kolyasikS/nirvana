import {axios} from "@lib/axios";
import {MainError, ResponseError} from "@lib/errors";
import {IGetAllUserTasks} from "@lib/query/manager/queryOptions";
import {makeTaskTime} from "@lib/utils";

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

  static async getAllWorkerTasks(): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/assignmentsToUsers/allOwn`);
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