import React from 'react';
import {TrashIcon} from "@radix-ui/react-icons";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {GET_ALL_ITEMS_QK} from "@lib/query/user/queryKeys";
import {GET_LACKING_ITEMS_QK} from "@lib/query/inventory-manager/queryKeys";
import {TaskController} from "@/controllers/manager/Task.controller";
import {GET_ASSIGNMENTS_QK} from "@lib/query/manager/queryKeys";
import {useToast} from "@/hooks/use-toast";
import {AMOUNT_IN_PAGE} from "@lib/constants";

type Props = {
  assignmentId: string;
}
const DeleteAssignment = ({
  assignmentId,
}: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteItemMutation = useMutation({
    mutationFn: (TaskController.deleteAssignment),
    onMutate: async ({ id: assignmentId }: IDeleteAssessment) => {
      await queryClient.cancelQueries({ queryKey: [GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE], exact: true });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE]);

      queryClient.setQueryData<IResponse>([GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE], (oldResponse) =>
        ({
          ...oldResponse,
          data: {
            count: oldResponse?.data?.count - 1,
            assignments: oldResponse?.data?.assignments?.filter((assignment: IAssignment) =>
              assignment.id !== assignmentId,
            )
          }
        }) as IResponse
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
      queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE], exact: true });
      toast({
        title: message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE], exact: true });
    },
  })

  const deleteTaskHandler = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!deleteItemMutation.isPending) {
      deleteItemMutation.mutate({ id: assignmentId });
    }
  }

  return (
    <div className="font-medium">
      <TrashIcon
        onClick={deleteTaskHandler}
        className={`text-red-500 w-5 h-5 cursor-pointer hover:text-red-600 transition`}
      />
    </div>
  );
};

export default DeleteAssignment;