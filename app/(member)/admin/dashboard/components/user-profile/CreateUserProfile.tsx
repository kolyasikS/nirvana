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
import {AMOUNT_IN_PAGE, USER_ROLE_LABELS} from "@lib/constants";

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
      await queryClient.cancelQueries({ queryKey: [GET_ALL_USERS_QK, 1, AMOUNT_IN_PAGE] });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_USERS_QK, 1, AMOUNT_IN_PAGE]);

      const newUserWithId = {
        ...newUser,
        id: newUser.email,
      };
      queryClient.setQueryData<IResponse>([GET_ALL_USERS_QK, 1, AMOUNT_IN_PAGE], (oldResponse) => oldResponse?.data?.users
          ? {
            ...oldResponse,
            data: {
              count: oldResponse?.data?.count + 1,
              users: [...oldResponse?.data?.users, newUserWithId]
            }} as IResponse
          : {
            ...oldResponse,
            data: {
              count: oldResponse?.data?.count + 1,
              users: [newUserWithId]
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
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS_QK] });
      toast({
        title: message
      });
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS_QK] });
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
          id="email"
          type="email"
          placeholder="m@example.com"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          label={'Email'}
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
                  {Object.entries(USER_ROLE_LABELS).map(([key, value]) => (
                    <SelectItem key={value} value={value}>{key}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <FormInputBox
          id="gender"
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

