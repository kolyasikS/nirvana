import {axios} from "@lib/axios";
import {ResponseError} from "@lib/errors";
import {AMOUNT_IN_PAGE} from "@lib/constants";

export class ItemController {
  static async createItem(createItemDto: ICreateItem): Promise<IResponse> {
    try {
      const result = await axios.post(`/items`, createItemDto);

      return {
        message: 'Item has been created successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async deleteItem({ id }: IDeleteItem): Promise<IResponse> {
    try {
      const result = await axios.delete(`/items?itemId=${id}`);

      return {
        message: 'Item has been deleted successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async updateItem(updateItemDto: IUpdateItem): Promise<IResponse> {
    try {
      const result = await axios.put(`/items`, updateItemDto);

      return {
        message: 'Item has been updated successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async getLackingItems(): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/items/lackingItems`);
      return {
        error: false,
        message: 'Lacking items were fetched successfully.',
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

  static async makeOrder(makeOrderDto: IOrder): Promise<IResponse> {
    try {
      const result = await axios.put(`/items/order`, {
        itemsToOrder: makeOrderDto.items
      });

      return {
        message: 'Order has been made successfully.',
        data: result.data,
        error: false,
      }
    } catch (error: any) {
      console.error(error);
      throw ResponseError.createResponseError(error);
    }
  }

  static async getItemHistory({ pagination, month }: IGetItemHistory): Promise<IResponse> {
    try {
      let queryParams = '';
      if (pagination) {
        queryParams = `?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`;
      } else if (month) {
        queryParams = `?month=${month}`;
      }
      const { data } = await axios.get(`/itemHistories${queryParams}`);
      return {
        error: false,
        message: 'History of modifying items were fetched successfully.',
        data
      }
    } catch (error: any) {
      if (error.status === 404) {
        return {
          error: false,
          message: 'History of modifying items were fetched successfully.',
          data: [],
        }
      } else {
        console.error(error);
        throw ResponseError.createResponseError(error);
      }
    }
  }

  static async getMostPopularItem(): Promise<IResponse> {
    try {
      const { data } = await axios.get(`/itemHistories/mostPopularItem`);
      return {
        error: false,
        message: 'The most popular item of inventory was fetched successfully.',
        data
      }
    } catch (error: any) {
      if (error.status === 404) {
        return {
          error: false,
          message: 'The most popular item of inventory was fetched successfully.',
          data: [],
        }
      } else {
        console.error(error);
        throw ResponseError.createResponseError(error);
      }
    }
  }
}