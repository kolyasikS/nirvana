import React, {useCallback} from 'react';
import {
  Badge,
} from "@/components/ui";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast";
import {GET_ALL_WORKER_TASKS_QK} from "@lib/query/worker/queryKeys";
import {getAssignmentStatuses} from "@lib/query/user/queryOptions";
import {TaskController} from "@/controllers/manager/Task.controller";
import {GET_ALL_USER_TASKS_QK} from "@lib/query/manager/queryKeys";

type IUsedItem = IItem & {
  usedAmount: number;
}
type Props = {
  taskId: string;
  date: Date;
  userEmail: string;
}
const StatusModal = ({
  taskId,
  date,
  userEmail,
}: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: assignmentStatusesResponse,
  } = useQuery(
    getAssignmentStatuses()
  );

  const updateStatusMutation = useMutation({
    mutationFn: (TaskController.updateStatus),
    onMutate: async ({ assignmentToUserId: newTaskId, newStatus }: IUpdateTaskStatus) => {
      const queryKey = [GET_ALL_USER_TASKS_QK, userEmail, -1, -1];
      await queryClient.cancelQueries({ queryKey });
      const previousResponse = queryClient.getQueryData<IResponse>(queryKey);

      queryClient.setQueryData<IResponse>(queryKey, (oldResponse) =>
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

      return { previousResponse };
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_TASKS_QK, userEmail, -1 , -1], exact: true });
      toast({
        title: message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_TASKS_QK, userEmail, -1 , -1], exact: true });
    }
  });

  const updateStatusTaskHandler = useCallback(async (newStatus: string) => {
    updateStatusMutation.mutate({
      assignmentToUserId: taskId,
      newStatus: assignmentStatusesResponse?.data?.find((_status: IAssignmentToUserStatus) => _status.name === newStatus)
    });
  }, [updateStatusMutation, taskId]);

  return (
    <div className={'flex flex-1 items-center min-w-fit dark:text-white gap-2'}>
      <button onClick={() => updateStatusTaskHandler('Approved')}>
        <Badge variant={'success'}>{'Approve'}</Badge>
      </button>
      <button onClick={() => updateStatusTaskHandler('Rejected')}>
        <Badge variant={'destructive'}>{'Reject'}</Badge>
      </button>
    </div>
  );
};

export default StatusModal;