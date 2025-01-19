import {axios} from "@lib/axios";
import {MainError, ResponseError} from "@lib/errors";
import {IGetAllUserTasks} from "@lib/query/manager/queryOptions";
import {makeTaskTime} from "@lib/utils";

export class TaskController {

  static async createTask(createTaskDto: ICreateTask): Promise<IResponse> {
    try {
      const startTime = makeTaskTime(createTaskDto.date, createTaskDto.startTime.hours, createTaskDto.startTime.minutes);
      const endTime = makeTaskTime(createTaskDto.date, createTaskDto.endTime.hours, createTaskDto.endTime.minutes);

      const result = await axios.post(`/assignmentsToUsers`, {
        startTime,
        endTime,
        assignmentId: createTaskDto.typeId,
        details: createTaskDto.details,
        userId: createTaskDto.userId
      });

      return {
        message: 'Task has been created successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async deleteTask({ id }: IDeleteTask): Promise<IResponse> {
    try {
      const result = await axios.delete(`/assignmentsToUsers`, {
        data: {
          id
        }
      });

      return {
        message: 'Task has been deleted successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async markAsCompleted({ id }: IMarkAsCompletedTask): Promise<IResponse> {
    try {
      const result = await axios.put(`/assignmentsToUsers/markAsCompleted`, {
        data: {
          assignmentToUserId: id
        }
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

  static async getAllUserTasks({ userEmail }: IGetAllUserTasks): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/assignmentsToUsers?email=${userEmail}`);
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
        throw new MainError(error.message);
      }
    }
  }
}