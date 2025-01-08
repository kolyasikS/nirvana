import React, {useState} from 'react';
import {ChevronDownIcon, TrashIcon} from "@radix-ui/react-icons";
import {cn} from "@lib/utils-client";
import {getTaskTime} from "@lib/utils";

type Props = {
  task: ITask;
  number: number;
}
const Task = ({
  task,
  number
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
          {!task.isCompleted && (
            <TrashIcon
              onClick={() => {}} // delete
              className={`text-red-500 w-5 h-5 cursor-pointer hover:text-red-600 transition`}
            />
          )}
        </div>
      </div>
      <div
        className={cn('pl-7 transition-all duration-200 ease-in-out', {
          'max-h-0 opacity-0': !detailsVisible,
          'max-h-[1000px] opacity-100': detailsVisible,
        })}
      >
        <p className={'font-bold text-sm mt-3'}>Details:</p>
        <p>{task.details}</p>
      </div>
    </div>
  );
};

export default Task;