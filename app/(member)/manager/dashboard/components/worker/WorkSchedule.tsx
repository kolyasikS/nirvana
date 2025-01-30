import React, {useEffect} from 'react';
import Timetable from "@/app/(member)/manager/dashboard/components/worker/Timetable";
import {CreateTask} from "@/app/(member)/manager/dashboard/components/task/CreateTask";
import {useQuery} from "@tanstack/react-query";
import {getAllUserTasksOptions} from "@lib/query/manager/queryOptions";
import {getWorkDays} from "@lib/utils";
import Task from "@/app/(member)/manager/dashboard/components/task/components/Task";
import {ListTasksWrapper} from "@/components/wrappers";

type Props = {
  selectedWorker: IUserDetails;
  setSelectedWorker: (work: IUserDetails | null) => void;
}
const WorkSchedule = ({
  selectedWorker,
  setSelectedWorker
}: Props) => {
  const [dates, setDates] = React.useState<Date[] | undefined>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  const onDateSelect = (dates: Date[] | undefined, selectedDate: Date) => {
    setSelectedDate(selectedDate)
  }

  const {
    data: tasksData,
    isPending
  } = useQuery(
    getAllUserTasksOptions({ userEmail: selectedWorker.email }),
  );

  useEffect(() => {
    if (tasksData?.data) {
      const workDays = getWorkDays(tasksData?.data);
      setDates(workDays);
    }
  }, [tasksData]);

  return (
    <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
      <Timetable
        dates={dates}
        isPending={isPending}
        tasks={tasksData?.data ?? []}
        onDateSelect={onDateSelect}
        close={() => setSelectedWorker(null)}
      />
      {selectedDate && (<>
        <ListTasksWrapper
          userEmail={selectedWorker.email}
          tasks={tasksData?.data ?? []}
          date={selectedDate}
          TaskComponent={Task}
        />
        <CreateTask
          onClose={() => {}}
          user={selectedWorker}
          date={selectedDate}
          tasks={tasksData?.data ?? []}
        />
      </>)}
    </div>
  );
};

export default WorkSchedule;