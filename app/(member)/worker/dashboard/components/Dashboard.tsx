'use client';

import * as React from "react";
import {
  TooltipProvider
} from "@/components/ui/tooltip"
import {observer} from "mobx-react-lite";
import {useMemo} from "react";
import {userStore} from "@lib/stores";
import TasksCalendar from "@/app/(member)/worker/dashboard/components/tasks-calendar/TasksCalendar";
import {DashboardHeader} from "@/components/ui/widgets";

export const Dashboard = observer(() => {
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
            <TasksCalendar/>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
})

export default Dashboard;
