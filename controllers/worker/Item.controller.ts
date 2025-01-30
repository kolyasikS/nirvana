import {axios} from "@lib/axios";
import {ResponseError} from "@lib/errors";

export class ItemController {
  static async modifyItem(makeOrderDto: IModifyItem): Promise<IResponse> {
    try {
      const result = await axios.put(`/items/modify`, {
        itemId: makeOrderDto.itemId,
        amount: -makeOrderDto.amount,
      });

      return {
        message: 'Item has been modified successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }
}