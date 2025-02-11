'use client';
import * as React from "react"
import { CSVLink } from "react-csv";
import Link from "next/link"
import {
  Home,
  LineChart,
  ListFilter,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
  Tooltip,
  TooltipContent, TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Loader,
} from "@/components/ui";
import {observer} from "mobx-react-lite";
import {useMutation, useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {uppercaseWord} from "@lib/utils";
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import UserProfileCard from "@/app/(member)/admin/dashboard/components/user-profile/UpdateProfileCard";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {userStore} from "@lib/stores";
import {getAllUsersOption} from "@lib/query/user/queryOptions";
import {toast} from "@/hooks/use-toast";
import {DashboardHeader} from "@/components/ui/widgets";
import {AMOUNT_IN_PAGE} from "@lib/constants";
import {TablePagination} from "@/components/ui/features";
import {FileIcon} from "@radix-ui/react-icons";
import {exportUsers} from "@lib/export";
import ExportUsersButton from "@/app/(member)/admin/dashboard/components/ExportUsersButton";

export const Dashboard = observer(() => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: usersResponse,
    isFetching,
    isPlaceholderData,
  } = useQuery(
    getAllUsersOption({
      pagination: {
        pageNumber: 1,
        pageSize: AMOUNT_IN_PAGE,
      }
    })
  );

  const [selectedUser, setSelectedUser] = useState<null | IUserDetails>(null);
  const [isUserCreating, setIsUserCreating] = useState<boolean>(false);

  const showUserProfileCard = !!selectedUser || isUserCreating;

  const breadcrumbs = useMemo(() => [{
    title: `${userStore.user?.role ?? ''} Dashboard`,
    route: '',
  }], []);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-gray-100/40 dark:bg-zinc-800/40">
        {/*<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">*/}
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-0">
          <DashboardHeader breadcrumbs={breadcrumbs}/>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            {/*lg:col-span-2*/}
            <div className={`grid auto-rows-max items-start gap-4 md:gap-8 ${showUserProfileCard ? 'lg:col-span-2' : 'lg:col-span-4'}`}>
              <Tabs defaultValue="week">
                <div className="flex items-center mb-2">
                  {/*<TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>*/}
                  <div className="flex w-full items-center gap-2 justify-end">
                    {/*<DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5"/>
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuCheckboxItem checked>
                          Fulfilled
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Declined
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Refunded
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>*/}
                    <ExportUsersButton users={usersResponse?.data?.users ?? []}/>
                  </div>
                </div>
                <TabsContent value="week">
                  <Card
                    className={'dark:border-zinc-800'}
                    x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount.">
                    <CardHeader className="px-7">
                      <CardTitle>Users</CardTitle>
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
                          {usersResponse?.data?.users?.map((user: IUserDetails) => (
                            <TableRow
                              key={user.id}
                              className={`${user.id === selectedUser?.id ? 'bg-gray-100 dark:bg-zinc-800' : ''}`}
                              onClick={() => setSelectedUser(user)}
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
                        count={usersResponse?.data?.count ?? 0}
                      />
                      {isPlaceholderData && isFetching && (
                        <div className={'absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-[2px]'}>
                          <Loader/>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <Button
                  className={'mt-5'}
                  onClick={() => {
                    setIsUserCreating(true);
                    setSelectedUser(null);
                  }}
                >
                  Create New User
                </Button>
              </Tabs>
            </div>
            {showUserProfileCard && (
              <UserProfileCard
                selectedUser={selectedUser}
                close={() => {
                  setSelectedUser(null);
                  setIsUserCreating(false);
                }}
              />
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
})

export default Dashboard;
