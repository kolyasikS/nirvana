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
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-0">
          <DashboardHeader breadcrumbs={breadcrumbs}/>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-[100px]">
            <TasksCalendar/>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
})

export default Dashboard;
