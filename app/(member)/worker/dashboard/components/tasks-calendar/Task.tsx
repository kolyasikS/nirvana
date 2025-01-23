'use client';

import React, {useState} from 'react';
import {ChevronDownIcon, TrashIcon} from "@radix-ui/react-icons";
import {cn} from "@lib/utils-client";
import {getTaskTime} from "@lib/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TaskController} from "@/controllers/manager/Task.controller";
import {GET_ALL_USER_TASKS_QK} from "@lib/query/manager/queryKeys";
import {useToast} from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button, Input, Label} from "@/components/ui";

type Props = {
  task: ITask;
  number: number;
  userEmail: string;
  onMarkAsCompletedClick: () => void;
}
const Task = ({
  task,
  number,
  userEmail,
  onMarkAsCompletedClick
}: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [detailsVisible, setDetailsVisible] = useState(false);

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
  });

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
        {!task.isCompleted && (
          <Dialog>
            <DialogTrigger asChild>
              <div className={'flex flex-1 items-center min-w-fit'}>
                <button className={'underline text-sm text-emerald-400'} onClick={onMarkAsCompletedClick}>
                  Mark as completed
                </button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Mark as completed</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Task;