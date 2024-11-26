import {StatusMessages} from "@lib/messages";

export class MainError extends Error {
  constructor(message: string, status: number | null = null) {
    if (message) {
      super(message);
    } else if (!message && status && status >= 500) {
      super(MainError.getStatusMessage(status));
    } else {
      super(MainError.getStatusMessage(0));
    }

    this.name = "MainError"; // Set the error name to your custom error class name
    Object.setPrototypeOf(this, MainError.prototype);
  }

  static getStatusMessage(status: number) {
    return StatusMessages[status] || StatusMessages[0];
  };
}