import React from 'react';
import {userStore} from "@lib/stores";
import {ListTasksWrapper} from "@/components/wrappers";
import Task from "@/app/(member)/worker/dashboard/components/tasks-calendar/Task";

type Props = {
  selectedDate: Date;
  tasks: ITask[];
  items: IItem[];
}
const ListTasks = ({
  selectedDate,
  tasks,
  items
}: Props) => {
  return (
    <ListTasksWrapper
      userEmail={userStore.user?.email ?? ''}
      tasks={tasks}
      date={selectedDate}
      TaskComponent={Task}
      taskProps={{
        items
      }}
    />
  );
};

export default ListTasks;