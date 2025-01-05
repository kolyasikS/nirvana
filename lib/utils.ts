import {ResponseError} from "@lib/errors";

export const isServer = () => {
  return typeof window === 'undefined';
}

export const uppercaseWord = (word: string) => {
  if (word) {
    return word[0].toUpperCase() + word.slice(1);
  } else {
    return '';
  }
}

export const makeResponse = async (
  nextResponse: Response,
  message: string = '',
): Promise<IResponse> => {
  const error = !nextResponse.ok;
  let data;
  try {
    data = await nextResponse.json();
  } catch {
    data = null;
  }

  return {
    message: data?.message || message,
    error,
    data
  }
}

export const getOneMessageFromErrorObject = (errors: any) => {
  const keys = Object.keys(errors);
  if (keys.length === 0) {
    return null;
  } else {
    return `${keys[0]} ${errors[keys[0]]}`;
  }
}