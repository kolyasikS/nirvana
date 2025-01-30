'use client'

import React, { useState } from 'react'
import {useToast} from "@/hooks/use-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AdminController} from "@/controllers/admin/Admin.controller";
import {FormInputBox} from "@/components/ui";
import {uppercaseWord} from "@lib/utils";
import {Button} from "@/components/ui";
import {validateUpdateUserSchema} from "@lib/validation/admin-validation";
import {GET_ALL_USERS_QK} from "@lib/query/user/queryKeys";

type Props = {
  user: IUserDetails;
  onClose: () => void;
}
export function UpdateUserProfile({
  user,
  onClose,
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    sex: user.sex
  });

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
    onError: (error) => {
      // if (context?.previousUsers) {
      //   queryClient.setQueryData([GET_ALL_USERS_QK], context.previousUsers);
      // }
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS_QK], exact: true });
      toast({
        title: message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS_QK], exact: true });
    }
  })

  const updateUserProfileHandler = async (e: any) => {
    e.preventDefault();
    if (!updateUserMutation.isPending) {
      const validationResult = await validateUpdateUserSchema(form);
      if (validationResult.error) {
        toast({
          title: validationResult.message,
          variant: 'destructive',
        });
        return;
      }

      updateUserMutation.mutate(form);
    }
  }

  return (
    <form className="space-y-4" onSubmit={updateUserProfileHandler}>
      <div className="grid gap-4">
        <FormInputBox
          id="name"
          placeholder="John"
          value={form.firstName}
          onChange={(e) => setForm({...form, firstName: e.target.value})}
          label={'First Name'}
        />
        <FormInputBox
          id="last_name"
          placeholder="Snow"
          value={form.lastName}
          onChange={(e) => setForm({...form, lastName: e.target.value})}
          label={'Last Name'}
        />
        <FormInputBox
          id="role"
          placeholder="Manager"
          value={form.role}
          onChange={(e) => setForm({...form, role: e.target.value})}
          label={'Role'}
        />
        <FormInputBox
          id="gender"
          placeholder="Male"
          value={uppercaseWord(form.sex)}
          onChange={(e) => setForm({...form, sex: e.target.value})}
          label={'Gender'}
        />
      </div>
      <Button type="submit" className="w-full">
        Update
      </Button>
    </form>
  )
}

