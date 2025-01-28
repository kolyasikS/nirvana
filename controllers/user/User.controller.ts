import {axios} from "@lib/axios";
import {IGetUsers} from "@lib/query/user/queryOptions";
import {MainError} from "@lib/errors";

export class UserController {

  static async getAllUsers({ roles }: IGetUsers) {
    try {
      const { data } = await axios.get(`/users`);
      if (roles && roles.length > 0) {
        return data.filter((user: IUserDetails) => roles.includes(user.role));
      } else {
        return data;
      }
    } catch (error: any) {
      console.error(error);
      return {
        error: true,
        message: error.message
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
        throw new MainError(error.message);
      }
    }
  }

}