'use client'

import React, { useState } from 'react'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast";
import {AdminController} from "@/controllers/admin/Admin.controller";
import {FormInputBox} from "@/components/ui/features";
import {uppercaseWord} from "@lib/utils";
import {Button, Loader} from "@/components/ui";
import {validateCreateUserSchema} from "@lib/validation/admin-validation";
import {GET_ALL_USERS_QK} from "@lib/query/user/queryKeys";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {AMOUNT_IN_PAGE, USER_ROLE_LABELS, USER_ROLES_ENUM} from "@lib/constants";
import {TaskController} from "@/controllers/manager/Task.controller";
import {GET_ASSIGNMENTS_QK} from "@lib/query/manager/queryKeys";

type Props = {
  onClose: () => void;
  roles: IRole[];
};

export function CreateAssignment({
  onClose,
  roles
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    role: '',
  });

  const createAssignmentMutation = useMutation({
    mutationFn: (TaskController.createAssignment),
    onMutate: async (newAssignment: ICreateAssessment) => {
      await queryClient.cancelQueries({ queryKey: [GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE] });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE]);

      const newAssignmentWithId = {
        ...newAssignment,
        id: newAssignment.name,
      };
      queryClient.setQueryData<IResponse>([GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE], (oldResponse) => oldResponse?.data?.assignments
          ? {
            ...oldResponse,
            data: {
              count: oldResponse?.data?.count + 1,
              assignments: [...oldResponse?.data?.assignments, newAssignmentWithId]
            }} as IResponse
          : {
            ...oldResponse,
            data: {
              count: oldResponse?.data?.count + 1,
              assignments: [newAssignmentWithId]
            }} as IResponse
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
      queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE] });
      toast({
        title: message
      });
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE] });
    }
  })

  const createAssignmentHandler = async (e: any) => {
    e.preventDefault();
    if (!createAssignmentMutation.isPending) {
      createAssignmentMutation.mutate({
        name: form.name,
        role: roles.find(role => role.name === form.role) as any,
      });
    }
  }

  return (
    <form className="space-y-4" onSubmit={createAssignmentHandler}>
      <div className="grid gap-4">
        <FormInputBox
          id="name"
          placeholder="Clean up"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          label={'Name'}
        />
        <div>
          <h3 className={'font-semibold mb-1'}>Role</h3>
          <div className={'flex space-x-4'}>
            <div className="flex-1">
              <Select
                value={form.role}
                onValueChange={(role: string) =>
                  setForm({
                    ...form,
                    role,
                  })}
              >
                <SelectTrigger id="task-type-select">
                  <SelectValue placeholder="Select type"/>
                </SelectTrigger>
                <SelectContent>
                  {[USER_ROLES_ENUM.Housemaid, USER_ROLES_ENUM.Technician].map(roleName => (
                    <SelectItem key={roleName} value={roleName}>{roleName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full">
        {createAssignmentMutation.isPending ? <Loader/> : 'Create'}
      </Button>
    </form>
  )
}

