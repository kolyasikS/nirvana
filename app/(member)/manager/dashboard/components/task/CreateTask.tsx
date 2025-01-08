'use client'

import React, {useCallback, useMemo, useState} from 'react'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast";
import {AdminController} from "@/controllers/admin/Admin.controller";
import {FormInputBox} from "@/components/ui/features/form-input-box";
import {uppercaseWord} from "@lib/utils";
import {Button, FormTextareaBox, Label, Loader} from "@/components/ui";
import {validateCreateUserSchema} from "@lib/validation/admin-validation";
import {GET_ALL_USERS_QK} from "@lib/query/user/queryKeys";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {TASK_TYPES, USER_ROLES} from "@lib/constants";
import {TaskController} from "@/controllers/manager/Task.controller";
import SelectTime from "@/app/(member)/manager/dashboard/components/task/components/SelectTime";

const hours = Array.from({ length: 15 }, (_, i) => String(i + 8).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

type Props = {
  onClose: () => void;
  userRole: string;
  userId: string;
  date: Date;
};
export function CreateTask ({
  onClose,
  userRole,
  userId,
  date
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  console.log(date);
  const [form, setForm] = useState<ICreateTask>({
    startTime: {
      hours: '12',
      minutes: '00',
    },
    endTime: {
      hours: '13',
      minutes: '30',
    },
    details: '',
    typeId: '',
    date,
    userId,
  });

  const createTaskMutation = useMutation({
    mutationFn: (TaskController.createTask),
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
    if (!createTaskMutation.isPending) {
      // const validationResult = await validateCreateUserSchema(form);
      // if (validationResult.error) {
      //   toast({
      //     title: validationResult.message,
      //     variant: 'destructive',
      //   });
      //   return;
      // }

      createTaskMutation.mutate(form);
    }
  }

  const availableTaskTypes = useMemo(() =>
    TASK_TYPES.filter(type =>
      type.roleId === USER_ROLES.find(role => role.name === userRole)?.id
    ), [userRole]);

  const setFormStartTimeHours = useCallback((hours: string) =>
    setForm(form => ({
      ...form,
      startTime: {
        ...form.startTime,
        hours
      }
    }
  )), []);

  const setFormStartTimeMinutes = useCallback((minutes: string) =>
    setForm(form => ({
      ...form,
      startTime: {
        ...form.startTime,
        minutes
      }
    }
  )), []);

  const setFormEndTimeHours = useCallback((hours: string) =>
    setForm(form => ({
        ...form,
        endTime: {
          ...form.endTime,
          hours
        }
      }
    )), []);

  const setFormEndTimeMinutes = useCallback((minutes: string) =>
    setForm(form => ({
        ...form,
        endTime: {
          ...form.endTime,
          minutes
        }
      }
    )), []);

  return (
    <form
      className="flex flex-col w-full bg-zinc-950 rounded-xl border border-zinc-800 p-5 relative dark:text-gray-50"
      onSubmit={createUserProfileHandler}
    >
      <h2 className="text-2xl font-bold mb-5">Creating Task</h2>
      <div className="space-y-4">
        <div className={''}>
          <h3 className={'font-semibold text-emerald-300 mb-1'}>Start Time</h3>
          <div className={'flex space-x-4 mb-6'}>
            <SelectTime
              value={form.startTime.hours}
              setValue={setFormStartTimeHours}
              placeholder={'Select hour'}
              label={'Hour'}
              time={hours}
            />
            <SelectTime
              value={form.startTime.minutes}
              setValue={setFormStartTimeMinutes}
              placeholder={'Select minute'}
              label={'Minute'}
              time={minutes}
            />
          </div>
        </div>
        <div className={''}>
          <h3 className={'font-semibold text-emerald-300 mb-1'}>End Time</h3>
          <div className={'flex space-x-4 mb-6'}>
            <SelectTime
              value={form.endTime.hours}
              setValue={setFormEndTimeHours}
              placeholder={'Select hour'}
              label={'Hour'}
              time={hours}
            />
            <SelectTime
              value={form.endTime.minutes}
              setValue={setFormEndTimeMinutes}
              placeholder={'Select minute'}
              label={'Minute'}
              time={minutes}
            />
          </div>
        </div>
        <div>
          <h3 className={'font-semibold text-emerald-300 mb-1'}>Selected Time</h3>
          <p className={'text-lg'}>{form.startTime.hours}:{form.startTime.minutes} — {form.endTime.hours}:{form.endTime.minutes}</p>
        </div>
        <div>
          <FormTextareaBox
            label={'Details'}
            labelClassname={'font-semibold text-emerald-300 mb-1 text-base'}
            placeholder={'Type task details.'}
            value={form.details}
            onChange={(e) => setForm({...form, details: e.target.value })}
          />
        </div>
        <div className={''}>
          <h3 className={'font-semibold text-emerald-300 mb-1'}>Task Type</h3>
          <div className={'flex space-x-4 mb-6'}>
            <div className="flex-1">
              <Select
                value={form.typeId}
                onValueChange={(typeId) =>
                  setForm({
                    ...form,
                    typeId
                  }
                )}
              >
                <SelectTrigger id="task-type-select">
                  <SelectValue placeholder="Select type"/>
                </SelectTrigger>
                <SelectContent>
                  {availableTaskTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full mt-5">
        {createTaskMutation.isPending ? <Loader/> : 'Create'}
      </Button>
    </form>
  )
}

