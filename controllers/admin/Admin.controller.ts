import {axios} from "@lib/axios";

export class AdminController {

  static async getAllUsers() {
    try {
      const { data } = await axios.get(`/users/all`);
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
}