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
import {AuthController} from "@/controllers/auth/Auth.controller";
import {userStore} from "@lib/stores";
import {toast} from "@/hooks/use-toast";
import {USER_ROLES_ENUM} from "@lib/constants";
import {getAllUsersOption} from "@lib/query/user/queryOptions";
import WorkSchedule from "@/app/(member)/manager/dashboard/components/worker/WorkSchedule";
import WorkerCharts from "@/app/(member)/manager/dashboard/components/worker/WorkerCharts";
import {BarChartIcon} from "@radix-ui/react-icons"
import TasksCalendar from "@/app/(member)/worker/dashboard/components/tasks-calendar/TasksCalendar";

export const Dashboard = observer(() => {
  // const { data: queryUsers } = useSuspenseQuery(getAllUsersOption);
  // const {
  //   data: workers,
  // } = useQuery(
  //   getAllUsersOption({ roles: [USER_ROLES_ENUM.Housemaid, USER_ROLES_ENUM.Technician]})
  // );
  const workers: any[] = [];
  const router = useRouter();

  // const [users, setUsers] = useState(queryUsers);
  // useEffect(() => {
  //   setUsers(queryUsers);
  // }, [queryUsers]);

  const [selectedWorker, setSelectedWorker] = useState<null | IUserDetails>(
    null);

  const [showWorkerCharts, setShowWorkerCharts] = useState<boolean>(false
    // {
    //   "id": "9f19739a-02ad-47a0-91d7-ec467bd8ce31",
    //   "firstName": "Kytylo",
    //   "lastName": "Gotvyanski",
    //   "sex": "male",
    //   "email": "kyrylo.hotvianskyi@nure.ua",
    //   "emailConfirmed": true,
    //   "role": "Housemaid"
    // }
  );

  const logout = useMutation({
    mutationFn: (AuthController.logout),
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message}) => {
      userStore.clearUser();
      toast({
        title: message
      });
      router.push('/login');
    },
  });

  const selectWorker = (worker: IUserDetails) => {
    if (selectedWorker?.id === worker.id) {
      setSelectedWorker(null);
    } else {
      setSelectedWorker(worker);
    }
  }
  console.log(userStore);
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
          <header
            className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 ">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5"/>
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-900 text-lg font-semibold text-gray-50 md:text-base dark:bg-gray-50 dark:text-gray-900"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110"/>
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <Home className="h-5 w-5"/>
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-gray-950 dark:text-gray-50"
                  >
                    <ShoppingCart className="h-5 w-5"/>
                    Orders
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <Package className="h-5 w-5"/>
                    Products
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <Users2 className="h-5 w-5"/>
                    Customers
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <LineChart className="h-5 w-5"/>
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className={'flex justify-between w-full gap-5'}>
              <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <BreadcrumbPage>{userStore.user?.role}</BreadcrumbPage>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Settings className="h-5 w-5"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/*<DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator/>*/}
                  <DropdownMenuItem onClick={logout.mutate as any}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-[100px]">
            {/*lg:col-span-2*/}
            <TasksCalendar/>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
})

export default Dashboard;
