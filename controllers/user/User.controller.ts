import {axios} from "@lib/axios";
import {IGetUsers} from "@lib/query/user/queryOptions";
import {MainError, ResponseError} from "@lib/errors";
import {AMOUNT_IN_PAGE} from "@lib/constants";

export class UserController {

  static async getAllUsers({ roles, pagination: { pageNumber, pageSize } }: IGetUsers): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      let filteredData: any = {};
      if (roles && roles.length > 0) {
        filteredData = {
          users: data.users.filter((user: IUserDetails) => roles.includes(user.role)),
          count: data.count,
        };
      } else {
        filteredData = data;
      }

      return {
        error: false,
        message: 'Users were fetched successfully.',
        data: filteredData,
      }
    } catch (error: any) {
      console.error(error);
      if (error.status === 404) {
        return {
          error: false,
          message: 'Users were fetched successfully.',
          data: [],
        }
      } else {
        throw ResponseError.createResponseError(error);
      }
    }
  }

  static async getAllItems({ pageNumber = 1, pageSize = AMOUNT_IN_PAGE }: IPagination): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/items?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      return {
        error: false,
        message: 'Items were fetched successfully.',
        data
      }
    } catch (error: any) {
      if (error.status === 404) {
        return {
          error: false,
          message: 'Items were fetched successfully.',
          data: [],
        }
      } else {
        console.error(error);
        throw ResponseError.createResponseError(error);
      }
    }
  }

  static async getAllRoles(): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/roles`);
      return {
        error: false,
        message: 'Roles were fetched successfully.',
        data
      }
    } catch (error: any) {
      if (error.status === 404) {
        return {
          error: false,
          message: 'Roles were fetched successfully.',
          data: [],
        }
      } else {
        console.error(error);
        throw ResponseError.createResponseError(error);
      }
    }
  }
}