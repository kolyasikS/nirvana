'use client';

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Loader,
} from "@/components/ui";
import {observer} from "mobx-react-lite";
import {useQuery} from "@tanstack/react-query";
import {uppercaseWord} from "@lib/utils";
import {useMemo, useState} from "react";
import {userStore} from "@lib/stores";
import {AMOUNT_IN_PAGE, USER_ROLES_ENUM} from "@lib/constants";
import {getAllRoles, getAllUsersOption} from "@lib/query/user/queryOptions";
import WorkSchedule from "@/app/(member)/manager/dashboard/components/worker/WorkSchedule";
import WorkerCharts from "@/app/(member)/manager/dashboard/components/worker/chart/WorkerCharts";
import {DashboardHeader} from "@/components/ui/widgets";
import {TablePagination} from "@/components/ui/features";

export const Dashboard = observer(() => {
  const [pageNumber, setPageNumber] = useState(1);
  // const workersResponse = {
  //   data: {
  //     "users": [
  //     {
  //       "id": "181eae58-202d-4757-86e2-578df1743d6c",
  //       "firstName": "InventoryManager",
  //       "lastName": "InventoryManager",
  //       "sex": "male",
  //       "email": "inventorymanager@localhost.com",
  //       "emailConfirmed": true,
  //       "role": "InventoryManager"
  //     },
  //     {
  //       "id": "217d332c-ef08-4f06-86b3-68df9eb48e73",
  //       "firstName": "Technician",
  //       "lastName": "Technician",
  //       "sex": "male",
  //       "email": "technician@localhost.com",
  //       "emailConfirmed": true,
  //       "role": "Technician"
  //     },
  //     {
  //       "id": "8e445865-a24d-4543-a6c6-9443d048cdb9",
  //       "firstName": "Admin",
  //       "lastName": "Admin",
  //       "sex": "male",
  //       "email": "admin@localhost.com",
  //       "emailConfirmed": true,
  //       "role": "Administrator"
  //     },
  //     {
  //       "id": "a9aebd65-e077-4d28-bb62-314428739789",
  //       "firstName": "Manager",
  //       "lastName": "Manager",
  //       "sex": "male",
  //       "email": "manager@localhost.com",
  //       "emailConfirmed": true,
  //       "role": "Manager"
  //     },
  //     {
  //       "id": "d525eef7-5569-4b54-8b6d-2f796bc9ba9a",
  //       "firstName": "Housemaid",
  //       "lastName": "Housemaid",
  //       "sex": "female",
  //       "email": "housemaid@localhost.com",
  //       "emailConfirmed": true,
  //       "role": "Housemaid"
  //     }
  //     ],
  //     "count": 5
  //   },
  // };
  // const isFetching = false;
  // const isPlaceholderData = false;
  const {
    data: workersResponse,
    isFetching,
    isPlaceholderData
  } = useQuery(
    getAllUsersOption({
      roles: [USER_ROLES_ENUM.Housemaid, USER_ROLES_ENUM.Technician],
      pagination: {
        pageNumber: 1,
        pageSize: AMOUNT_IN_PAGE,
      }
    })
  );
  const {
    data: rolesResponse,
  } = useQuery(
    getAllRoles()
  );
  console.log(rolesResponse)

  const [selectedWorker, setSelectedWorker] = useState<null | IUserDetails>(null);

  const selectWorker = (worker: IUserDetails) => {
    if (selectedWorker?.id === worker.id) {
      setSelectedWorker(null);
    } else {
      setSelectedWorker(worker);
    }
  }

  const breadcrumbs = useMemo(() => [{
    title: `Manager Dashboard`,
    route: '',
  }], []);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <DashboardHeader breadcrumbs={breadcrumbs}/>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-[100px]">
        <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
          <div
            className={`grid auto-rows-max items-start gap-4 md:gap-8 ${selectedWorker ? 'lg:col-span-3' : 'lg:col-span-3'}`}>
            <Tabs defaultValue="week">
              <TabsContent value="week">
                <Card
                  className={'dark:border-zinc-800'}
                  x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount.">
                  <CardHeader className="px-7">
                    <CardTitle>Workers</CardTitle>
                    <CardDescription>
                      Members of «Nirvana» hotel.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table className={'mb-5'}>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Full Name</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Post
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Gender
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Email Confirmation Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {workersResponse?.data?.users?.map((user: IUserDetails) => (
                          <TableRow
                            key={user.id}
                            className={`${user.id === selectedWorker?.id ? 'bg-gray-100 dark:bg-zinc-800' : ''}`}
                            onClick={() => selectWorker(user)}
                          >
                            <TableCell>
                              <div className="font-medium">{user.firstName}&nbsp;{user.lastName}</div>
                              <div className="hidden text-sm text-gray-500 md:inline dark:text-gray-400">
                                {user.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {user.role}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="outline">
                                {uppercaseWord(user.sex)}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {user.emailConfirmed ? 'Confirmed' : 'Pending'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      count={workersResponse?.data?.count ?? 0}
                    />
                    {isPlaceholderData && isFetching && (
                      <div className={'absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-[2px]'}>
                        <Loader/>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          {/*{(*/}
        </div>
        {selectedWorker && (
          <WorkSchedule
            selectedWorker={selectedWorker}
            setSelectedWorker={setSelectedWorker}
            roles={rolesResponse?.data ?? []}
          />
        )}
        <WorkerCharts workers={workersResponse?.data?.users ?? []}/>
      </main>
    </div>
    /*<TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-gray-100/40 dark:bg-zinc-800/40">
      </div>
    </TooltipProvider>*/
  )
})

export default Dashboard;
