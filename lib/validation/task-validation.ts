
import {object, string} from 'yup';
import {makeTaskTime} from "@lib/utils";

const createTaskSchema = object({
  startTime: object({
    hours: string().required('Start Time is required'),
    minutes: string().required('Start Time is required'),
  }).required('Start Time is required'),
  endTime: object({
    hours: string().required('End Time is required'),
    minutes: string().required('End Time is required'),
  }).required('End Time is required'),
  details: string().required('Details is required'),
  typeId: string().required('Type is required'),
});

const markAsCompletedTaskSchema = object({
  assignmentToUserId: string().required('Task ID is required'),
});


export async function validateCreateTaskSchema(createTask: ICreateTask): Promise<ValidationResult> {
  return await createTaskSchema.validate(createTask)
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}

export async function validateMarkAsCompletedTaskSchema(markAsCompletedTask: IMarkAsCompletedTask): Promise<ValidationResult> {
  return await markAsCompletedTaskSchema.validate(markAsCompletedTask)
    .then(() => ({
      error: false,
      message: ''
    }))
    .catch(err => ({
      error: true,
      message: err.errors[0]
    }));
}

export async function validateCreateTaskTime({
  tasks,
  startTime,
  endTime,
  date,
}: {
  tasks: ITask[],
  startTime: {
    hours: string,
    minutes: string;
  },
  endTime: {
    hours: string,
    minutes: string;
  },
  date: Date,
}): Promise<ValidationResult> {
  if (!tasks?.length) {
    return {
      error: false,
      message: '',
    }
  }

  const startTimeDate = makeTaskTime(date, startTime.hours, startTime.minutes);
  const endTimeDate = makeTaskTime(date, endTime.hours, endTime.minutes);


  if (startTimeDate >= endTimeDate) {
    return {
      error: true,
      message: 'Start Time must be earlier than End Time',
    }
  }

  let error = false;
  let message = '';
  tasks.forEach((task: ITask) => {
    const taskStartTime = new Date(task.startTime);
    const taskEndTime = new Date(task.endTime);
    if (startTimeDate >= taskStartTime && startTimeDate < taskEndTime ||
      endTimeDate >= taskStartTime && endTimeDate < taskEndTime) {
      error = true;
      message = 'Selected Time range is not available.';
      return;
    }
  });

  return {
    error,
    message,
  }
}
