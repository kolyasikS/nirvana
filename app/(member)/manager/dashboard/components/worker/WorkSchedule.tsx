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
  roles: IRole[];
}
const WorkSchedule = ({
  selectedWorker,
  setSelectedWorker,
  roles,
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
  // const tasksData = {
  //   data: [
  //     {
  //       "id": "d981a33d-04d0-4984-89d3-787f2f684ca0",
  //       "assignment": {
  //         "id": "c8837679-cb17-41a3-93b0-c7d797a61a76",
  //         "name": "Clear room",
  //         "role": {
  //           "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
  //           "name": "Housemaid"
  //         }
  //       },
  //       "assignmentToUserStatus": {
  //         "id": "c6f0b461-e6ae-42fd-b13b-0e52c67c48e1",
  //         "name": "Approved"
  //       },
  //       "user": null,
  //       "details": "string",
  //       "startTime": "2025-03-06T17:13:20.154Z",
  //       "endTime": "2025-03-06T18:13:20.154Z"
  //     },
  //     {
  //       "id": "3c1ba8f5-4ee6-428f-a04f-49f114f03c3e",
  //       "assignment": {
  //         "id": "c8837679-cb17-41a3-93b0-c7d797a61a76",
  //         "name": "Clear room",
  //         "role": {
  //           "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
  //           "name": "Housemaid"
  //         }
  //       },
  //       "assignmentToUserStatus": {
  //         "id": "3022c20b-6201-4569-ba95-1a5eb8b7be83",
  //         "name": "Not Accepted"
  //       },
  //       "user": null,
  //       "details": "WQEQWE",
  //       "startTime": "2025-04-08T08:00:00Z",
  //       "endTime": "2025-04-08T08:10:00Z"
  //     },
  //     {
  //       "id": "1ee6185c-b74a-4539-b237-a57562e28e84",
  //       "assignment": {
  //         "id": "c8837679-cb17-41a3-93b0-c7d797a61a76",
  //         "name": "Clear room",
  //         "role": {
  //           "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
  //           "name": "Housemaid"
  //         }
  //       },
  //       "assignmentToUserStatus": {
  //         "id": "3022c20b-6201-4569-ba95-1a5eb8b7be83",
  //         "name": "Not Accepted"
  //       },
  //       "user": null,
  //       "details": "wsad",
  //       "startTime": "2025-04-15T08:00:00Z",
  //       "endTime": "2025-04-15T08:19:00Z"
  //     },
  //     {
  //       "id": "88d0ff63-84f5-4928-95fc-3f96f58823b5",
  //       "assignment": {
  //         "id": "c8837679-cb17-41a3-93b0-c7d797a61a76",
  //         "name": "Clear room",
  //         "role": {
  //           "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
  //           "name": "Housemaid"
  //         }
  //       },
  //       "assignmentToUserStatus": {
  //         "id": "3022c20b-6201-4569-ba95-1a5eb8b7be83",
  //         "name": "Not Accepted"
  //       },
  //       "user": null,
  //       "details": "asdasd",
  //       "startTime": "2025-04-15T10:00:00Z",
  //       "endTime": "2025-04-15T12:00:00Z"
  //     },
  //     {
  //       "id": "bdc45cd2-8057-447f-aa9e-415ec66700db",
  //       "assignment": {
  //         "id": "c8837679-cb17-41a3-93b0-c7d797a61a76",
  //         "name": "Clear room",
  //         "role": {
  //           "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
  //           "name": "Housemaid"
  //         }
  //       },
  //       "assignmentToUserStatus": {
  //         "id": "2bfa63c2-77e9-44eb-a36d-7fa181e64cf0",
  //         "name": "Completed"
  //       },
  //       "user": null,
  //       "details": "asdsad",
  //       "startTime": "2025-04-23T08:00:00Z",
  //       "endTime": "2025-04-23T08:22:00Z"
  //     }
  //   ]
  // }
  // const isPending = false;

  useEffect(() => {
    if (tasksData?.data) {
      const workDays = getWorkDays(tasksData?.data);
      setDates(workDays);
    }
  // }, [tasksData]);
  }, []);

  return (
    <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
      <Timetable
        dates={dates}
        isPending={isPending}
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
          roles={roles}
        />
      </>)}
    </div>
  );
};

export default WorkSchedule;