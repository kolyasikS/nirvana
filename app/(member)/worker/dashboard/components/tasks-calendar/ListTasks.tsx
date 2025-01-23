import React, {useEffect} from 'react';
import {userStore} from "@lib/stores";
import {ListTasksWrapper} from "@/components/wrappers";
import Task from "@/app/(member)/worker/dashboard/components/tasks-calendar/Task";

type Props = {
  selectedDate: Date;
  tasks: ITask[];
}
const ListTasks = ({
  selectedDate,
  tasks,
}: Props) => {
  // const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  // const onDateSelect = (dates: Date[] | undefined, selectedDate: Date) => {
  //   setSelectedDate(selectedDate)
  // }
  return (
    <ListTasksWrapper
      userEmail={userStore.user?.email ?? ''}
      tasks={tasks}
      date={selectedDate}
      TaskComponent={Task}
      taskProps={{
        onMarkAsCompletedClick: () => {console.log(1)},
      }}
    />
  );
};

export default ListTasks;