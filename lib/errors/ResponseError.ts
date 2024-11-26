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
}