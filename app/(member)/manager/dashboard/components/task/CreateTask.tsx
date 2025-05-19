'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast";
import {Button, FormTextareaBox, Loader} from "@/components/ui";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {AMOUNT_IN_PAGE, TASK_TYPES} from "@lib/constants";
import {TaskController} from "@/controllers/manager/Task.controller";
import SelectTime from "@/app/(member)/manager/dashboard/components/task/components/SelectTime";
import {GET_ALL_USER_TASKS_QK} from "@lib/query/manager/queryKeys";
import {makeTaskTime} from "@lib/utils";
import {validateCreateTaskSchema, validateCreateTaskTime} from "@lib/validation/task-validation";
import {getAssignments} from "@lib/query/manager/queryOptions";

const hours = Array.from({ length: 15 }, (_, i) => String(i + 8).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

const defaultTaskForm = {
  startTime: {
    hours: '08',
    minutes: '00',
  },
  endTime: {
    hours: '08',
    minutes: '00',
  },
  details: '',
  typeId: '',
}
type Props = {
  onClose: () => void;
  user: IUserDetails;
  date: Date;
  tasks: ITask[];
  roles: IRole[];
};
export function CreateTask ({
  onClose,
  user,
  date,
  tasks,
  roles
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState<ICreateTask>({
    ...defaultTaskForm,
    date,
    userId: user.id,
  });

  useEffect(() => {
    setForm((form) => ({
      ...form,
      date,
      userId: user.id,
    }));
  }, [date, user.id]);

  const createTaskMutation = useMutation({
    mutationFn: (TaskController.createTask),
    onMutate: async (task: ICreateTask) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_USER_TASKS_QK, user.email, -1, -1], exact: true });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_USER_TASKS_QK, user.email, -1, -1]);

      const newTaskWithId: ITask = {
        startTime: makeTaskTime(task.date, task.startTime.hours, task.startTime.minutes).toString(),
        endTime: makeTaskTime(task.date, task.endTime.hours, task.endTime.minutes).toString(),
        details: task.details,
        user: user,
        assignmentToUserStatus: null as any,
        assignment: {
          id: `${Date.now()}`,
          name: TASK_TYPES.find(type => type.id === task.typeId)?.name ?? '',
          role: {
            id: roles.find(role => role.name === user.role)?.id ?? '',
            name: user.role,
          }
        },
        isCompleted: false,
        id: task.startTime.hours + task.startTime.minutes + task.endTime.hours + task.endTime.minutes,
      };
      queryClient.setQueryData<IResponse>([GET_ALL_USER_TASKS_QK, user.email], (oldResponse) =>
        oldResponse?.data
          ? {...oldResponse, data: [...oldResponse.data, newTaskWithId]} as IResponse
          : {...oldResponse, data: [newTaskWithId]} as IResponse
      );

      setForm({
        ...defaultTaskForm,
        date,
        userId: user.id,
      });
      onClose();
      return { previousResponse };
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_TASKS_QK, user.email, -1, -1], exact: true });
      toast({
        title: message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_TASKS_QK, user.email, -1, -1], exact: true });
    }
  })

  const createTaskHandler = async (e: any) => {
    e.preventDefault();
    console.log(form)
    if (!createTaskMutation.isPending) {
      const validationSchemaResult = await validateCreateTaskSchema(form);
      if (validationSchemaResult.error) {
        toast({
          title: validationSchemaResult.message,
          variant: 'destructive',
        });
        return;
      }

      const validationTimeResult = await validateCreateTaskTime({
        tasks,
        endTime: form.endTime,
        startTime: form.startTime,
        date
      });
      if (validationTimeResult.error) {
        toast({
          title: validationTimeResult.message,
          variant: 'destructive',
        });
        return;
      }

      createTaskMutation.mutate(form);
    }
  }

  const {
    data: assignmentsResponse,
  } = useQuery(getAssignments({
    pageNumber: 1,
    pageSize: AMOUNT_IN_PAGE,
  }));

  const availableTaskTypes: IAssignment[] = useMemo(() =>
    assignmentsResponse?.data?.assignments?.filter((assignment: IAssignment) => assignment.role.name === user.role),
    [assignmentsResponse, user.role]);
  console.log(assignmentsResponse, availableTaskTypes, user)
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
      onSubmit={createTaskHandler}
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
                  {availableTaskTypes?.map(type => (
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

