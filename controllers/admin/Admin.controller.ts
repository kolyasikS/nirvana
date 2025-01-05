import {axios} from "@lib/axios";
import {MainError, ResponseError} from "@lib/errors";
import {validateCreateUserSchema, validateUpdateUserSchema} from "@lib/validation/admin-validation";

export class AdminController {

  static async getAllUsers() {
    try {
      const { data } = await axios.get(`/users`);
      console.log(data)
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        error: true,
        message: error.message
      }
    }
  }

  static async getUser({ userId }: GetUser) {
    try {
      const { data } = await axios.get(`/users/${userId}`);
      console.log(data)
      return data;
    } catch (error: any) {
      console.error(error);
      return {
        error: true,
        message: error.message
      }
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