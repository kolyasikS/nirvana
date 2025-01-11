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

export const getWorkDays = (tasks: ITask[]): Date[] => {
  const uniqueDays: Set<string> = new Set();
  tasks.forEach(task => {
    const date = (new Date(task.startTime)).toDateString();
    uniqueDays.add(date);
  })

  return [...uniqueDays].map((day: string) => new Date(day));
}

export const getTaskTime = (task: ITask) => {
  const startTime = new Date(task.startTime);
  const endTime = new Date(task.endTime);

  return startTime.toLocaleTimeString('en-US', {minute: '2-digit', hour: '2-digit', hour12: false}) + ' — ' + endTime.toLocaleTimeString('en-US', {minute: '2-digit', hour: '2-digit', hour12: false});
}

export const makeTaskTime = (date: Date, hours: string, minutes: string) => {
  const startTime = new Date(date);
  startTime.setHours(parseInt(hours));
  startTime.setMinutes(parseInt(minutes));

  return startTime;
}