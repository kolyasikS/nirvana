'use client'

import React, { useState } from 'react'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast";
import {AdminController} from "@/controllers/admin/Admin.controller";
import {FormInputBox} from "@/components/ui/form-input-box";
import {uppercaseWord} from "@lib/utils";
import {Button, Label, Loader} from "@/components/ui";
import {validateCreateUserSchema} from "@lib/validation/admin-validation";
import {GET_ALL_USERS_QK} from "@lib/query/user/queryKeys";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type Props = {
  onClose: () => void;
};

const hours = Array.from({ length: 15 }, (_, i) => String(i + 8).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

export function CreateTask ({
  onClose,
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState<ITask>({
    startTime: {
      hours: '12',
      minutes: '00',
    },
    endTime: {
      hours: '13',
      minutes: '30',
    },
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
    <form
      className="space-y-4 flex flex-col w-full bg-zinc-950 rounded-xl border border-zinc-800 p-5 relative dark:text-gray-50"
      onSubmit={createUserProfileHandler}
    >
      <h2 className="text-2xl font-bold mb-3">Creating Task</h2>
      <div className="">
        <div className={''}>
          <h3 className={'font-semibold text-emerald-300 mb-1'}>Start Time</h3>
          <div className={'flex space-x-4 mb-6'}>
            <div className="flex-1">
              <Label htmlFor="hour-select">Hour</Label>
              <Select
                value={form.startTime.hours}
                onValueChange={(hours) =>
                  setForm({
                    ...form,
                    startTime: {
                      ...form.startTime,
                      hours
                    }
                  }
                )}
              >
                <SelectTrigger id="hour-select">
                  <SelectValue placeholder="Select hour"/>
                </SelectTrigger>
                <SelectContent>
                  {hours.map(hour => (
                    <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="minute-select">Minute</Label>
              <Select
                value={form.startTime.minutes}
                onValueChange={(minutes) =>
                  setForm({
                    ...form,
                    startTime: {
                      ...form.startTime,
                      minutes
                    }
                  }
                )}
              >
                <SelectTrigger id="minute-select">
                  <SelectValue placeholder="Select minute"/>
                </SelectTrigger>
                <SelectContent>
                  {minutes.map(minute => (
                    <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className={''}>
          <h3 className={'font-semibold text-emerald-300 mb-1'}>End Time</h3>
          <div className={'flex space-x-4 mb-6'}>
            <div className="flex-1">
              <Label htmlFor="hour-select">Hour</Label>
              <Select
                value={form.endTime.hours}
                onValueChange={(hours) =>
                  setForm({
                    ...form,
                    endTime: {
                      ...form.endTime,
                      hours
                    }
                  }
                )}
              >
                <SelectTrigger id="hour-select">
                  <SelectValue placeholder="Select hour"/>
                </SelectTrigger>
                <SelectContent>
                  {hours.map(hour => (
                    <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="minute-select">Minute</Label>
              <Select
                value={form.endTime.minutes}
                onValueChange={(minutes) =>
                  setForm({
                    ...form,
                    endTime: {
                      ...form.endTime,
                      minutes
                    }
                  }
                )}
              >
                <SelectTrigger id="minute-select">
                  <SelectValue placeholder="Select minute"/>
                </SelectTrigger>
                <SelectContent>
                  {minutes.map(minute => (
                    <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <h3 className={'font-semibold text-emerald-300 mb-1'}>Selected Time</h3>
        <p className={'text-lg'}>{form.startTime.hours}:{form.startTime.minutes} — {form.endTime.hours}:{form.endTime.minutes}</p>
      </div>
      <Button type="submit" className="w-full">
        {createUserMutation.isPending ? <Loader/> : 'Create'}
      </Button>
    </form>
  )
}

