import {AxiosError, isAxiosError} from "axios";
import {getOneMessageFromErrorObject} from "@lib/utils";

export class ResponseError extends Error {
  errors: any[];
  title: string;
  status: number;
  type: string;

  constructor({
    errors,
    title,
    status,
    type,
  }: ServerResponseError) {
    super(title);

    this.type = type;
    this.title = title;
    this.status = status;
    this.errors = errors;

    this.name = "ResponseError"; // Set the error name to your custom error class name
    Object.setPrototypeOf(this, ResponseError.prototype);
  }

  static createResponseError(error: any, message: string = 'Request Error. Try again later'): ResponseError {
    if (isAxiosError(error)) {
      const axiosError: AxiosError<any> = error as AxiosError;
      if (axiosError.response) {
        const { data, status} = axiosError.response;

        const errorMessage = data?.title || getOneMessageFromErrorObject(data.errors) || message;
        throw new ResponseError({
          title: errorMessage,
          status: status,
          type: data?.type || "Server Error",
          errors: data?.errors || [],
        });
      } else {
        throw new ResponseError({
          title: axiosError.message,
          status: 500,
          type: "Network Error",
          errors: [],
        });
      }
    } else {
      // Handle unexpected non-Axios errors
      throw new ResponseError({
        title: error.message || "Unknown Error",
        status: 500,
        type: "Unknown Error",
        errors: [],
      });
    }
  }
}