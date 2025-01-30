import {axios} from "@lib/axios";
import {ResponseError} from "@lib/errors";
import {IGetUser} from "@lib/query/admin/queryOptions";

export class AdminController {

  static async getUser({ userId }: IGetUser): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/users/${userId}`);

      return {
        message: 'Data has been fetched successfully.',
        data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
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