'use client';

import * as React from "react"
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import {observer} from "mobx-react-lite";
import {useQuery} from "@tanstack/react-query";
import {uppercaseWord} from "@lib/utils";
import {useMemo, useState} from "react";
import {userStore} from "@lib/stores";
import {USER_ROLES_ENUM} from "@lib/constants";
import {getAllUsersOption} from "@lib/query/user/queryOptions";
import WorkSchedule from "@/app/(member)/manager/dashboard/components/worker/WorkSchedule";
import WorkerCharts from "@/app/(member)/manager/dashboard/components/worker/chart/WorkerCharts";
import {DashboardHeader} from "@/components/ui/widgets";

export const Dashboard = observer(() => {
  const {
    data: workersResponse,
  } = useQuery(
    getAllUsersOption({ roles: [USER_ROLES_ENUM.Housemaid, USER_ROLES_ENUM.Technician]})
  );

  const [selectedWorker, setSelectedWorker] = useState<null | IUserDetails>(
    null);

  const selectWorker = (worker: IUserDetails) => {
    if (selectedWorker?.id === worker.id) {
      setSelectedWorker(null);
    } else {
      setSelectedWorker(worker);
    }
  }

  const breadcrumbs = useMemo(() => [{
    title: `${userStore.user?.role ?? ''} Dashboard`,
    route: '',
  }], []);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-gray-100/40 dark:bg-zinc-800/40">
        {/*<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex dark:bg-background">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 bg-gray-100 dark:bg-gray-800  dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Home className="h-5 w-5"/>
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-900 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-50 dark:hover:text-gray-50"
                >
                  <ShoppingCart className="h-5 w-5"/>
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Package className="h-5 w-5"/>
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Users2 className="h-5 w-5"/>
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <LineChart className="h-5 w-5"/>
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Settings className="h-5 w-5"/>
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>*/}
        {/*<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">*/}
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-0">
          <DashboardHeader breadcrumbs={breadcrumbs}/>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-[100px]">
            {/*lg:col-span-2*/}
            <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
              <div
                className={`grid auto-rows-max items-start gap-4 md:gap-8 ${selectedWorker ? 'lg:col-span-3' : 'lg:col-span-3'}`}>
                <Tabs defaultValue="week">
                  {/*<div className="flex items-center">
                    <TabsList>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
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
                      </DropdownMenu>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-sm"
                      >
                        <File className="h-3.5 w-3.5"/>
                        <span className="sr-only sm:not-sr-only">Export</span>
                      </Button>
                    </div>
                  </div>*/}
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
                        <Table>
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
                            {workersResponse?.data.map((user: IUserDetails) => (
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
                      </CardContent>
                    </Card>
                  </TabsContent>
                  {/*<Button
                    className={'mt-5'}
                    onClick={() => setShowWorkerCharts(true)}
                  >
                    Show Worker Charts&ensp;<BarChartIcon/>
                  </Button>*/}
                </Tabs>
              </div>
              {/*{(*/}
            </div>
            {selectedWorker && (
              <WorkSchedule
                selectedWorker={selectedWorker}
                setSelectedWorker={setSelectedWorker}
              />
            )}
            <WorkerCharts workers={workersResponse?.data ?? []}/>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
})

export default Dashboard;
