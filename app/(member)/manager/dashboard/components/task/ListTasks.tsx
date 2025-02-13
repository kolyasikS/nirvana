'use client'

import React, {memo, useMemo} from 'react'
import {useToast} from "@/hooks/use-toast";

type Props = {
  userEmail: string;
  tasks: ITask[];
  date: Date;
  TaskComponent: React.FC<any>;
};
export const ListTasks = memo(({
  userEmail,
  tasks,
  date,
  TaskComponent,
}: Props) => {
  const onDateTasks = useMemo(() => {
    return tasks.filter((task: ITask) => {
      const taskDateTime = new Date(task.startTime);

      return taskDateTime.toDateString() === date.toDateString();
    })
  }, [tasks, date]);

  return (
    <div
      className="flex flex-col w-full bg-zinc-950 rounded-xl border border-zinc-800 p-5 relative dark:text-gray-50"
    >
      <div className={'flex w-full justify-between'}>
        <h2 className="text-2xl font-bold mb-5">Assigned Tasks</h2>
        <p>{date.toLocaleDateString('en-UK')}</p>
      </div>
      <div className="space-y-4">
        {onDateTasks.length > 0
          ? onDateTasks.map((task, ind) =>
            <TaskComponent task={task} number={ind} key={task.id} userEmail={userEmail}/>
          )
          : <p className={'text-lg text-center font-bold py-5 text-gray-400'}>No Tasks</p>
        }
      </div>
    </div>
  )
});

ListTasks.displayName = 'ListTasks';
export default ListTasks;
