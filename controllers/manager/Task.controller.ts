import {axios} from "@lib/axios";
import {MainError, ResponseError} from "@lib/errors";
import {IGetAllUserTasks} from "@lib/query/manager/queryOptions";
import {makeTaskTime} from "@lib/utils";
import {AMOUNT_IN_PAGE} from "@lib/constants";

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

  static async getAllUserTasks({ userEmail, month, year }: IGetAllUserTasks): Promise<IResponse> {
    try {
      let queryParamsString = `email=${userEmail}`;
      if (month !== -1) {
        queryParamsString += `&month=${month}`;
      }
      if (month !== -1) {
        queryParamsString += `&year=${year}`;
      }

      const { data } = await axios.get(`/assignmentsToUsers?${queryParamsString}`);
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

  static async getAssignments({ pageNumber = 1, pageSize = AMOUNT_IN_PAGE }: IPagination): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/assignments?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      return {
        error: false,
        message: 'Assignments were fetched successfully.',
        data
      }
    } catch (error: any) {
      if (error.status === 404) {
        return {
          error: false,
          message: 'Assignments items were fetched successfully.',
          data: [],
        }
      } else {
        console.error(error);
        throw ResponseError.createResponseError(error);
      }
    }
  }

  static async createAssignment(createAssessment: ICreateAssessment): Promise<IResponse> {
    try {
      const result = await axios.post(`/assignments`, {
        name: createAssessment.name,
        roleId: createAssessment.role.id,
      });

      return {
        message: 'Assignment has been created successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async updateAssignment(updateAssessment: IUpdateAssessment): Promise<IResponse> {
    try {
      const result = await axios.put(`/assignments`, {
        id: updateAssessment.id,
        name: updateAssessment.name,
        roleId: updateAssessment.roleId
      });

      return {
        message: 'Assignment has been updated successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async deleteAssignment({ id }: IDeleteAssessment): Promise<IResponse> {
    try {
      const result = await axios.delete(`/assignments`, {
        data: {
          assignmentId: id
        }
      });

      return {
        message: 'Assignment has been deleted successfully.',
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

  static async updateStatus({ newStatus, assignmentToUserId }: IUpdateTaskStatus): Promise<IResponse> {
    try {
      const result = await axios.put(`/assignmentsToUsers/check`, {
        assignmentToUserId,
        newStatusId: newStatus.id
      });

      return {
        message: `Task's status has been updated successfully.`,
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

}