import React, {useState} from 'react';
import {ChevronDownIcon, TrashIcon} from "@radix-ui/react-icons";
import {cn} from "@lib/utils-client";
import {getTaskTime} from "@lib/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TaskController} from "@/controllers/manager/Task.controller";
import {GET_ALL_USER_TASKS_QK} from "@lib/query/task/queryKeys";
import {useToast} from "@/hooks/use-toast";

type Props = {
  task: ITask;
  number: number;
  userEmail: string;
}
const Task = ({
  task,
  number,
  userEmail,
}: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [detailsVisible, setDetailsVisible] = useState(false);

  const deleteTaskMutation = useMutation({
    mutationFn: (TaskController.deleteTask),
    onMutate: async ({ id: newTaskId }: IDeleteTask) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_USER_TASKS_QK, userEmail], exact: true });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_USER_TASKS_QK, userEmail]);

      queryClient.setQueryData<IResponse>([GET_ALL_USER_TASKS_QK, userEmail], (oldResponse) =>
        oldResponse?.data
          ? {...oldResponse, data: oldResponse.data.filter((oldTask: ITask) => oldTask.id !== newTaskId)} as IResponse
          : oldResponse
      );
      return { previousResponse };
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_TASKS_QK, userEmail], exact: true });
      toast({
        title: message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_TASKS_QK, userEmail], exact: true });
    }
  })
  const markAsCompletedMutation = useMutation({
    mutationFn: (TaskController.markAsCompleted),
    onMutate: async ({ id: newTaskId }: IMarkAsCompletedTask) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_USER_TASKS_QK, userEmail], exact: true });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_USER_TASKS_QK, userEmail]);

      queryClient.setQueryData<IResponse>([GET_ALL_USER_TASKS_QK, userEmail], (oldResponse) =>
        oldResponse?.data
          ? {...oldResponse, data: oldResponse.data.map((oldTask: ITask) => oldTask.id === newTaskId ? ({...oldTask, isCompleted: true}) : oldTask)} as IResponse
          : oldResponse
      );
      setDetailsVisible(false);
      return { previousResponse };
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_TASKS_QK, userEmail], exact: true });
      toast({
        title: message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_TASKS_QK, userEmail], exact: true });
    }
  })

  const deleteTaskHandler = async (e: any) => {
    e.preventDefault();
    if (!deleteTaskMutation.isPending) {
      deleteTaskMutation.mutate({ id: task.id });
    }
  }

  const markAsCompletedTaskHandler = async (e: any) => {
    e.preventDefault();
    if (!markAsCompletedMutation.isPending) {
      markAsCompletedMutation.mutate({ id: task.id });
    }
  }

  return (
    <div className={cn({
      'text-green-300': task.isCompleted
    })}>
      <div className={cn(`flex w-full justify-between relative z-10'`)}>
        <div className={'flex gap-3'}>
          <p>{number + 1}.</p>
          <p>{getTaskTime(task)}</p>
          <p>{task.assignment.name} {task.isCompleted && <span className={'font-bold text-sm'}>(Completed)</span>}</p>
        </div>
        <div className={'flex gap-1 items-center'}>
          <p
            className={'text-sm hover:underline cursor-pointer'}
            onClick={() => setDetailsVisible(!detailsVisible)}
          >
            Show details <ChevronDownIcon className={'inline'}/>
          </p>
          {!task.isCompleted && (
            <TrashIcon
              onClick={deleteTaskHandler}
              className={`text-red-500 w-5 h-5 cursor-pointer hover:text-red-600 transition`}
            />
          )}
        </div>
      </div>
      <div
        className={cn('pl-7 transition-all duration-200 ease-in-out relative z-0 flex w-full justify-between overflow-hidden', {
          'max-h-0 opacity-0': !detailsVisible,
          'max-h-[1000px] opacity-100': detailsVisible,
        })}
      >
        <div className={'w-full'}>
          <p className={'font-bold text-sm mt-3'}>Details:</p>
          <p>{task.details}</p>
        </div>
        {/*{!task.isCompleted && (
          <div className={'flex flex-1 items-center min-w-fit'}>
            <button className={'underline text-sm text-emerald-400'} onClick={markAsCompletedTaskHandler}>Mark as
              completed
            </button>
          </div>
        )}*/}
      </div>
    </div>
  );
};

export default Task;