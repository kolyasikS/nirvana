'use client'

import React, { useState } from 'react'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast";
import {AdminController} from "@/controllers/admin/Admin.controller";
import {FormInputBox} from "@/components/ui/features/form-input-box";
import {uppercaseWord} from "@lib/utils";
import {Button, Loader} from "@/components/ui";
import {GET_ALL_USERS_QK} from "@lib/query/admin/queryKeys";
import {validateCreateUserSchema} from "@lib/validation/admin-validation";

type Props = {
  onClose: () => void;
};

export function CreateUserProfile({
  onClose,
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState<ICreateUserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    sex: '',
    role: '',
  });

  const createUserMutation = useMutation({
    mutationFn: (AdminController.createUser),
    onMutate: async (newUser: ICreateUserDetails) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_USERS_QK], exact: true });

      const previousUsers = queryClient.getQueryData<IUserDetails[]>([GET_ALL_USERS_QK]);

      const newUserWithId = {
        ...newUser,
        id: newUser.email,
      };
      queryClient.setQueryData<IUserDetails[]>([GET_ALL_USERS_QK], (oldUsers) =>
        oldUsers ? [...oldUsers, newUserWithId] : [newUserWithId as any]
      );
      onClose();
      return { previousUsers };
    },
    onError: (error) => {
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

  const createUserProfileHandler = async (e: any) => {
    e.preventDefault();
    if (!createUserMutation.isPending) {
      const validationResult = await validateCreateUserSchema(form);
      if (validationResult.error) {
        toast({
          title: validationResult.message,
          variant: 'destructive',
        });
        return;
      }

      createUserMutation.mutate(form);
    }
  }

  return (
    <form className="space-y-4" onSubmit={createUserProfileHandler}>
      <div className="grid gap-4">
        <FormInputBox
          id="name"
          type="name"
          placeholder="John"
          value={form.firstName}
          onChange={(e) => setForm({...form, firstName: e.target.value})}
          label={'First Name'}
        />
        <FormInputBox
          id="last_name"
          type="last_name"
          placeholder="Snow"
          value={form.lastName}
          onChange={(e) => setForm({...form, lastName: e.target.value})}
          label={'Last Name'}
        />
        <FormInputBox
          id="email"
          type="email"
          placeholder="m@example.com"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          label={'Email'}
        />
        <FormInputBox
          id="role"
          type="text"
          placeholder="Manager"
          value={form.role}
          onChange={(e) => setForm({...form, role: e.target.value})}
          label={'Role'}
        />
        <FormInputBox
          id="gender"
          type="gender"
          placeholder="Male"
          value={uppercaseWord(form.sex)}
          onChange={(e) => setForm({...form, sex: e.target.value})}
          label={'Gender'}
        />
      </div>
      <Button type="submit" className="w-full">
        {createUserMutation.isPending ? <Loader/> : 'Create'}
      </Button>
    </form>
  )
}

