'use client';

import * as React from "react"
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
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Loader,
} from "@/components/ui";
import {observer} from "mobx-react-lite";
import {useQuery} from "@tanstack/react-query";
import {useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import ItemCard from "@/app/(member)/inventory-manager/dashboard/components/item/ItemCard";
import {DashboardHeader} from "@/components/ui/widgets";
import {getItemHistories} from "@lib/query/inventory-manager/queryOptions";
import {getFormattedTime} from "@lib/utils";
import {TablePagination} from "@/components/ui/features";
import {AMOUNT_IN_PAGE} from "@lib/constants";
import ExportItemsHistoryButton
  from "@/app/(member)/inventory-manager/items-history/components/ExportItemsHistoryButton";
import {getAssignments} from "@lib/query/manager/queryOptions";
import UserProfileCard from "@/app/(member)/admin/dashboard/components/user-profile/UpdateProfileCard";
import AssignmentCard from "@/app/(member)/manager/assignments/components/AssignmentCard";
import {TrashIcon} from "@radix-ui/react-icons";
import DeleteAssignment from "@/app/(member)/manager/assignments/components/DeleteAssignment";

export const Dashboard = observer(() => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: assignmentsResponse,
    isFetching,
    isPlaceholderData
  } = useQuery(getAssignments({
    pageNumber,
    pageSize: AMOUNT_IN_PAGE,
  }));

  const [selectedAssignment, setSelectedAssignment] = useState<null | IAssignment>(null);
  const [isAssignmentCreating, setIsAssignmentCreating] = useState<boolean>(false);

  const showAssignmentCard = !!selectedAssignment || isAssignmentCreating;

  const breadcrumbs = useMemo(() => [{
    title: `Manager Dashboard`,
    route: '',
  }], []);
  console.log(assignmentsResponse)
  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader breadcrumbs={breadcrumbs}/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-[100px]">
          <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
            <div
              className={`grid auto-rows-max items-start gap-4 md:gap-8 ${selectedAssignment ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <Tabs defaultValue="week">
                <TabsContent value="week">
                  <Card
                    className={'dark:border-zinc-800'}
                    x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount.">
                    <CardHeader className="px-7">
                      <CardTitle>Assignments</CardTitle>
                      <CardDescription>
                        List of available assignments.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className={'relative'}>
                      <Table className={'mb-5'}>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Assignment Name</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Role
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assignmentsResponse?.data?.assignments?.map((assignment: IAssignment) => (
                            <TableRow
                              key={assignment.id}
                              onClick={() => setSelectedAssignment(assignment)}
                              className={'h-12'}
                            >
                              <TableCell>
                                <div className="font-medium">{assignment.name}</div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <div className="font-medium">{assignment.role.name}</div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <DeleteAssignment assignmentId={assignment.id} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        count={assignmentsResponse?.data?.count ?? 0}
                      />
                      {isPlaceholderData && isFetching && (
                        <div
                          className={'absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-[2px]'}>
                          <Loader/>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <Button
                  className={'mt-5'}
                  onClick={() => {
                    setIsAssignmentCreating(true);
                    setSelectedAssignment(null);
                  }}
                >
                  Create New Assignment
                </Button>
              </Tabs>
            </div>
            {showAssignmentCard && (
              <AssignmentCard
                selectedAssignment={selectedAssignment}
                close={() => {
                  setSelectedAssignment(null);
                  setIsAssignmentCreating(false);
                }}
              />
            )}
          </div>
        </main>
      </div>
    </>
  )
})

export default Dashboard;
