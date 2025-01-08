import {axios} from "@lib/axios";
import {MainError, ResponseError} from "@lib/errors";
import {IGetUser} from "@lib/query/admin/queryOptions";
import {IGetUsers} from "@lib/query/user/queryOptions";

export class AdminController {

  static async getUser({ userId }: IGetUser) {
    try {
      const { data } = await axios.get(`/users/${userId}`);
      console.log(data)
      return data;
    } catch (error: any) {
      console.error(error);
      throw new MainError(error.message);
    }
  }

  static async createUser(createUserDto: CreateUserDto): Promise<IResponse> {
    try {
      const result = await axios.post(`/auth/register`, {
        ...createUserDto,
        sex: createUserDto.sex.toLowerCase(),
      });
      return {
        message: 'User has been registered successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      throw ResponseError.createResponseError(error);
    }
  }

  static async updateUser(updateUserDto: UpdateUserDto): Promise<IResponse> {
    try {
      const result = await axios.put(`/users/update`, {
        ...updateUserDto,
        sex: updateUserDto.sex.toLowerCase(),
      });
      return {
        message: 'User has been updated successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      throw ResponseError.createResponseError(error);
    }
  }
}