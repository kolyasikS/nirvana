import {axios} from "@lib/axios";
import {IGetUsers} from "@lib/query/user/queryOptions";
import {MainError, ResponseError} from "@lib/errors";

export class UserController {

  static async getAllUsers({ roles }: IGetUsers): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/users`);
      let filteredData: any[] = [];
      if (roles && roles.length > 0) {
        filteredData = data.filter((user: IUserDetails) => roles.includes(user.role));
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

  static async getAllItems(): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/items`);
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