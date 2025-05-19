'use client';

import React, {useMemo, useState} from 'react';
import {ChevronDownIcon} from "@radix-ui/react-icons";
import {cn} from "@lib/utils-client";
import {getTaskTime} from "@lib/utils";
import StatusModal from "@/app/(member)/worker/dashboard/components/tasks-calendar/StatusModal";

type Props = {
  task: ITask;
  number: number;
  userEmail: string;
  onMarkAsCompletedClick: () => void;
  date: Date;
}
const Task = ({
  task,
  number,
  date,
}: Props) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className={cn({
      'text-green-300': task.isCompleted
    })}>
      <div className={cn(`flex w-full justify-between relative z-10'`)}>
        <div className={'flex gap-3'}>
          <p>{number + 1}.</p>
          <p>{getTaskTime(task)}</p>
          <p>{task.assignment.name} {task.isCompleted && <span className={'font-bold text-sm'}>(Completed)</span>}</p>
        </div>
        <div className={'flex gap-1 items-center'}>
          <p
            className={'text-sm hover:underline cursor-pointer'}
            onClick={() => setDetailsVisible(!detailsVisible)}
          >
            Show details <ChevronDownIcon className={'inline'}/>
          </p>
        </div>
      </div>
      <div
        className={cn('pl-7 transition-all duration-200 ease-in-out relative z-0 flex w-full justify-between overflow-hidden', {
          'max-h-0 opacity-0': !detailsVisible,
          'max-h-[1000px] opacity-100': detailsVisible,
        })}
      >
        <div className={'w-full'}>
          <p className={'font-bold text-sm mt-3'}>Details:</p>
          <p>{task.details}</p>
        </div>
        <StatusModal
          taskId={task.id}
          date={date}
          status={task.assignmentToUserStatus}
        />
      </div>
    </div>
  );
};

export default Task;