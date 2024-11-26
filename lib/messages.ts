export const StatusMessages: {
  [key: number]: string
} = {
  500: "Internal Server Error: Something went wrong on our end. Please try again later.",
  501: "Not Implemented: The requested functionality is not supported by the server.",
  502: "Bad Gateway: The server received an invalid response from an upstream server.",
  503: "Service Unavailable: The server is currently unable to handle the request. Please try again later.",
  504: "Gateway Timeout: The server took too long to respond. Please try again later.",
  505: "HTTP Version Not Supported: The server does not support the HTTP protocol version used in the request.",
  506: "Variant Also Negotiates: A server configuration error occurred. Please contact support.",
  507: "Insufficient Storage: The server does not have enough space to complete the operation.",
  508: "Loop Detected: The server encountered an infinite loop while processing the request.",
  510: "Not Extended: Additional extensions are required to process the request.",
  511: "Network Authentication Required: The client must authenticate to gain network access.",
  0: 'Unknown error occurred.'
};

export const SUCCESSFULLY_LOGIN_MESSAGE = 'You’ve successfully logged in.';