import {axios} from "@lib/axios";
import {IGetUsers} from "@lib/query/user/queryOptions";

export class UserController {

  static async getAllUsers({ roles }: IGetUsers) {
    try {
      const { data } = await axios.get(`/users`);
      console.log(data);
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

}