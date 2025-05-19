'use client'

import React, {useEffect, useState} from 'react'
import {useToast} from "@/hooks/use-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AdminController} from "@/controllers/admin/Admin.controller";
import {FormInputBox} from "@/components/ui";
import {uppercaseWord} from "@lib/utils";
import {Button} from "@/components/ui";
import {validateUpdateUserSchema} from "@lib/validation/admin-validation";
import {GET_ALL_USERS_QK} from "@lib/query/user/queryKeys";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {AMOUNT_IN_PAGE, USER_ROLE_LABELS, USER_ROLES, USER_ROLES_ENUM} from "@lib/constants";
import {TaskController} from "@/controllers/manager/Task.controller";
import {GET_ASSIGNMENTS_QK} from "@lib/query/manager/queryKeys";

type Props = {
  assignment: IAssignment;
  onClose: () => void;
  roles: IRole[];
}
export function UpdateAssignment({
  assignment,
  onClose,
  roles,
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState({
    id: assignment.id,
    name: assignment.name,
    role: assignment.role.name,
  });

  useEffect(() => {
    setForm({
      id: assignment.id,
      name: assignment.name,
      role: assignment.role.name,
    });
  }, [assignment]);

  const updateUserMutation = useMutation({
    mutationFn: (AdminController.updateUser),
    onMutate: async (updatedUser: IUpdateUserDetails) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_USERS_QK], exact: true });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_USERS_QK]);

      queryClient.setQueryData<IResponse>([GET_ALL_USERS_QK], (oldResponse) =>
        ({
          ...oldResponse,
          data: oldResponse?.data.map((user: IUserDetails) =>
            user.id === updatedUser.id
              ? { ...user, ...updatedUser }
              : user
          )
        }) as IResponse
      );
      onClose();
      return { previousResponse };
    },
  })
  const updateAssignmentMutation = useMutation({
    mutationFn: (TaskController.updateAssignment),
    onMutate: async (updatedAssignment: IUpdateAssessment) => {
      await queryClient.cancelQueries({ queryKey: [GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE] });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE]);

      queryClient.setQueryData<IResponse>([GET_ASSIGNMENTS_QK, 1, AMOUNT_IN_PAGE], (oldResponse) =>
        ({
          ...oldResponse,
          data: {
            count: oldResponse?.data?.count,
            assignments: oldResponse?.data?.assignments?.map((assignment: IAssignment) =>
              assignment.id === updatedAssignment.id
                ? { ...assignment, ...updatedAssignment }
                : assignment
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

  const updateAssignmentHandler = async (e: any) => {
    e.preventDefault();
    if (!updateAssignmentMutation.isPending) {
      updateAssignmentMutation.mutate({
        id: form.id,
        name: form.name,
        roleId: roles.find(role => role.name === form.role)?.id ?? '',
      });
    }
  }

  return (
    <form className="space-y-4" onSubmit={updateAssignmentHandler}>
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
        Update
      </Button>
    </form>
  )
}

