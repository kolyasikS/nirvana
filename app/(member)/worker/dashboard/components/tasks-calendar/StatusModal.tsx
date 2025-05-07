import React, {useCallback, useMemo, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@lib/utils-client";
import {
  Badge,
  Button,
  FormInputBox,
  Input, Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui";
import {PlusCircledIcon, TrashIcon} from "@radix-ui/react-icons";
import useDebounceValue from "@/hooks/useDebounceValue";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast";
import {TaskController} from "@/controllers/worker/Task.controller";
import {GET_ALL_WORKER_TASKS_QK} from "@lib/query/worker/queryKeys";
import {validateMarkAsCompletedTaskSchema} from "@lib/validation/task-validation";
import {validateModifyItemSchema} from "@lib/validation/item-validation";
import {ItemController} from "@/controllers/worker/Item.controller";
import {GET_ALL_ITEMS_QK} from "@lib/query/user/queryKeys";
import {getAllItemsOptions, getAllRoles, getAssignmentStatuses} from "@lib/query/user/queryOptions";
import {TablePagination} from "@/components/ui/features";
import MarkAsCompletedModal from "@/app/(member)/worker/dashboard/components/tasks-calendar/MarkAsCompletedModal";

type Props = {
  taskId: string;
  date: Date;
  status: IAssignmentToUserStatus;
}
const StatusModal = ({
  taskId,
  status,
  date
}: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const {
    data: assignmentStatusesResponse,
  } = useQuery(
    getAssignmentStatuses()
  );

  const updateStatusMutation = useMutation({
    mutationFn: (TaskController.updateStatus),
    onMutate: async ({ assignmentToUserId: newTaskId, newStatus }: IUpdateTaskStatus) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()] });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()]);

      queryClient.setQueryData<IResponse>([GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()], (oldResponse) =>
        oldResponse?.data
          ? {
            ...oldResponse,
            data: oldResponse.data.map((oldTask: ITask) =>
              oldTask.id === newTaskId
                ? ({
                  ...oldTask,
                  assignmentToUserStatus: newStatus
                })
                : oldTask)} as IResponse
          : oldResponse
      );

      setIsModalOpen(false);
      return { previousResponse };
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()], exact: true });
      toast({
        title: message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()], exact: true });
    }
  });

  const newStatus = useMemo(() => {
    if (status.name === 'Not Accepted') {
      return 'In Progress';
    } else if (['In Progress'].includes(status.name)) {
      return 'Completed';
    } else {
      return '';
    }
  }, [status])

  const badge = useMemo(() => {
    switch (status.name) {
      case 'Not Accepted':
      case 'Rejected':
        return (
          <Badge variant={'destructive'}>{status.name}</Badge>
        );
      case 'In Progress':
        return (
          <Badge variant={'secondary'}>{status.name}</Badge>
        );
      case 'Completed':
        return (
          <Badge variant={'success'}>{status.name}</Badge>
        );
    }
  }, [status])

  const updateStatusTaskHandler = useCallback(async () => {
    if (newStatus === 'Completed') {
      setIsCompleteModalOpen(true);
      setIsModalOpen(false);
    } else {
      updateStatusMutation.mutate({
        assignmentToUserId: taskId,
        newStatus: assignmentStatusesResponse?.data?.find((_status: IAssignmentToUserStatus) => _status.name === newStatus)
      });
    }
  }, [updateStatusMutation, taskId, newStatus]);

  return (
    <>
      <Dialog open={isModalOpen && !!newStatus} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild className={'cursor-pointer'}>
          <div className={'flex flex-1 items-center min-w-fit dark:text-white'}>
            {badge}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>
              Do you want to update the status to "{newStatus}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className={'flex w-full justify-between'}>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={updateStatusTaskHandler as any}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <MarkAsCompletedModal taskId={taskId} date={date} open={isCompleteModalOpen} close={() => setIsCompleteModalOpen(false)} />
    </>
  );
};

export default StatusModal;