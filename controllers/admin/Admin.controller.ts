import {axios} from "@lib/axios";
import {ResponseError} from "@lib/errors";

export class AdminController {
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