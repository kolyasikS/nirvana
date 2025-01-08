import React, {useEffect, useMemo, useState} from 'react';
import Timetable from "@/app/(member)/manager/dashboard/components/worker/Timetable";
import {ListTasks} from "@/app/(member)/manager/dashboard/components/task/ListTasks";
import {CreateTask} from "@/app/(member)/manager/dashboard/components/task/CreateTask";
import {useQuery} from "@tanstack/react-query";
import {getAllUsersOption} from "@lib/query/user/queryOptions";
import {USER_ROLES_ENUM} from "@lib/constants";
import {getAllUserTasksOptions} from "@lib/query/task/queryOptions";
import {getWorkDays} from "@lib/utils";

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
    getAllUserTasksOptions({ userEmail: selectedWorker.email })
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
      {!selectedDate && (<>
        <ListTasks
          onClose={() => {}}
          userRole={selectedWorker.role}
          tasks={tasksData?.data ?? []}
        />
        {/*<CreateTask
          onClose={() => {}}
          userRole={selectedWorker.role}
          userId={selectedWorker.id}
          date={selectedDate}
        />*/}
      </>)}
    </div>
  );
};

export default WorkSchedule;