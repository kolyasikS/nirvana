import React, {useEffect} from 'react';
import {Calendar} from "@/components/ui/calendar";
import {Cross1Icon} from "@radix-ui/react-icons"

type Props = {
  worker: IUserDetails;
  openTaskCreating: () => void;
  close: () => void;
}
const Timetable = ({
  worker,
  openTaskCreating,
  close
}: Props) => {
  const [date, setDate] = React.useState<Date[] | undefined>([]);

  useEffect(() => {
    let f = new Date();
    f.setDate(20);
    let s = new Date();
    s.setDate(21);
    let t = new Date();
    t.setDate(22);
    setDate([f, s, t]);
  }, []);

  const onSelect = (dates: Date[] | undefined, updatedDate: Date) => {
    openTaskCreating();
    console.log(dates, updatedDate);
  }

  return (
    <div className={'flex flex-col items-center w-full bg-zinc-950 rounded-xl border border-zinc-800 py-5 pb-10 relative'}>
      <h2 className={'text-xl text-white font-bold mb-3'}>Working Schedule</h2>
      <button onClick={close}>
        <Cross1Icon className={'text-emerald-600 hover:text-pink-600 transition w-5 h-5 absolute left-3 top-3'}/>
      </button>
      <Calendar
        mode="multiple"
        selected={date}
        onSelect={onSelect}
        disabled={{ before: new Date() }}
        className="rounded-md border shadow"
        classNames={{
          day_selected: 'bg-gray-900 text-gray-50 hover:bg-gray-900 hover:text-gray-50 focus:bg-gray-900 focus:text-gray-50 dark:bg-red-500 dark:text-white dark:hover:bg-gray-50 dark:hover:text-gray-900 dark:bg-red-600 dark:focus:text-gray-900'
        }}
      />
    </div>
  );
};

export default Timetable;