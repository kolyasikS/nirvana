import {axios} from "@lib/axios";
import {MainError, ResponseError} from "@lib/errors";
import {IGetUser} from "@lib/query/admin/queryOptions";
import {IGetAllUserTasks} from "@lib/query/task/queryOptions";

export class TaskController {

  static async createTask(createTaskDto: ICreateTask): Promise<IResponse> {
    try {
      const startTime = new Date(createTaskDto.date);
      startTime.setHours(parseInt(createTaskDto.startTime.hours));
      startTime.setMinutes(parseInt(createTaskDto.startTime.minutes));

      const endTime = new Date(createTaskDto.date);
      endTime.setHours(parseInt(createTaskDto.endTime.hours));
      endTime.setMinutes(parseInt(createTaskDto.endTime.minutes));

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

  static async getAllUserTasks({ userEmail }: IGetAllUserTasks): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/assignmentsToUsers?email=${userEmail}`);
      console.log(data)
      return {
        error: false,
        message: 'Tasks were fetched successfully.',
        data
      }
    } catch (error: any) {
      console.error(error);
      throw new MainError(error.message);
    }
  }
}