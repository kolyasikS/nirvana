import {axios} from "@lib/axios";

export class AdminController {

  static async getAllUsers() {
    try {
      const { data } = await axios.get(`/users/all`);
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