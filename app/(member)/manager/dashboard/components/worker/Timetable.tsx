import React from 'react';
import {Calendar} from "@/components/ui/calendar";
import {Cross1Icon} from "@radix-ui/react-icons"
import {Loader} from "@/components/ui";

type Props = {
  close: () => void;
  dates: Date[] | undefined;
  onDateSelect: (dates: Date[] | undefined, updatedDate: Date) => void;
  tasks: ITask[];
  isPending: boolean;
}
const Timetable = ({
  dates,
  close,
  onDateSelect,
  isPending,
  tasks,
}: Props) => {

  return (
    <div className={'flex flex-col items-center w-full bg-zinc-950 rounded-xl border border-zinc-800 py-5 pb-10 relative'}>
      <h2 className={'text-xl text-white font-bold mb-3'}>Working Schedule</h2>
      <button onClick={close}>
        <Cross1Icon className={'text-emerald-600 hover:text-pink-600 transition w-5 h-5 absolute left-3 top-3'}/>
      </button>
      {isPending
        ? (
          <div className={'min-h-[200px] w-full flex items-center justify-center'}>
            <Loader/>
          </div>
        )
        : (
          <Calendar
            mode="multiple"
            selected={dates}
            onSelect={onDateSelect}
            disabled={{ before: new Date() }}
            className="rounded-md border shadow "
            classNames={{
              day_selected: 'bg-gray-900 text-gray-50 hover:bg-gray-900 hover:text-gray-50 focus:bg-gray-900 focus:text-gray-50 dark:bg-red-500 dark:text-white dark:hover:bg-gray-50 dark:hover:text-white dark:bg-red-600 dark:focus:text-white'
            }}
          />
        )}
    </div>
  );
};

export default Timetable;