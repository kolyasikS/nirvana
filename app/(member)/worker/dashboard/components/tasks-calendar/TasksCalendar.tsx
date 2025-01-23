"use client"

import {useEffect, useMemo, useState} from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
  Tabs,
  TabsContent
} from "@/components/ui";
import * as React from "react";
import {cn} from "@lib/utils-client";
import Task from "@/app/(member)/manager/dashboard/components/task/components/Task";
import {ListTasksWrapper} from "@/components/wrappers";
import {userStore} from "@lib/stores";
import ListTasks from "@/app/(member)/worker/dashboard/components/tasks-calendar/ListTasks";
import {useQuery} from "@tanstack/react-query";
import {getAllUserTasksOptions} from "@lib/query/manager/queryOptions";
import {getWorkDays} from "@lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import QuantityInput from "@/app/(member)/inventory-manager/dashboard/components/order/QuantityInput";
import {PlusCircledIcon, TrashIcon} from "@radix-ui/react-icons";
import {ScrollArea} from "@/components/ui/scroll-area";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const TasksCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayIndex = (firstDayOfMonth.getDay() + 6) % 7 // Adjust to start week on Monday


  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const isToday = (date: number) => {
    const today = new Date()
    return (
      date === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }
  // const {
  //   data: tasksData,
  //   isPending
  // } = useQuery(
  //   getAllUserTasksOptions({ userEmail: userStore.user?.email ?? '' }),
  // );

  const tasksData = {
    data: [
      {
        "id": "cfce965a-2e79-4d46-af0b-2fbbc409bcdc",
        "assignment": {
          "name": "Clear room",
          "role": {
            "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
            "name": "Housemaid"
          }
        },
        "user": null,
        "details": "sadada",
        "startTime": "2025-01-17T10:00:00Z",
        "endTime": "2025-01-17T11:30:00Z",
        "isCompleted": false
      },
      {
        "id": "cf9706de-97d7-48f3-beaa-82543f998736",
        "assignment": {
          "name": "Clear room",
          "role": {
            "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
            "name": "Housemaid"
          }
        },
        "user": null,
        "details": "asdad",
        "startTime": "2025-01-13T10:00:00Z",
        "endTime": "2025-01-13T11:30:00Z",
        "isCompleted": false
      },
      {
        "id": "9944d926-9888-4a65-abfb-91ad26638c50",
        "assignment": {
          "name": "Clear room",
          "role": {
            "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
            "name": "Housemaid"
          }
        },
        "user": null,
        "details": "dsadsad",
        "startTime": "2025-01-29T08:01:00Z",
        "endTime": "2025-01-29T08:40:00Z",
        "isCompleted": false
      },
      {
        "id": "173cdf0e-52f7-4dc3-bdbc-354a9c679e44",
        "assignment": {
          "name": "Clear room",
          "role": {
            "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
            "name": "Housemaid"
          }
        },
        "user": null,
        "details": "asdsads",
        "startTime": "2025-01-13T12:00:00Z",
        "endTime": "2025-01-13T14:00:00Z",
        "isCompleted": false
      },
      {
        "id": "33f25fe6-1d82-4f92-a5df-c556ed7fdd99",
        "assignment": {
          "name": "Clear room",
          "role": {
            "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
            "name": "Housemaid"
          }
        },
        "user": null,
        "details": "asdsads",
        "startTime": "2025-01-29T12:00:00Z",
        "endTime": "2025-01-29T14:00:00Z",
        "isCompleted": false
      },
      {
        "id": "3e89cca8-8966-4f65-9288-722c9ef28fb9",
        "assignment": {
          "name": "Clear room",
          "role": {
            "id": "9beb8da7-4160-4db7-9982-05604a4e51d5",
            "name": "Housemaid"
          }
        },
        "user": null,
        "details": "asdsads",
        "startTime": "2025-01-29T15:00:00Z",
        "endTime": "2025-01-29T16:00:00Z",
        "isCompleted": false
      }
    ]
  }

  const workingDates = useMemo(() => {
    const tasksForDate: { [key: string]: number } = {};
    tasksData.data.forEach((task: ITask) => {
      const taskDate = new Date(task.startTime);
      const taskDateString = taskDate.toDateString();

      if (tasksForDate[taskDateString]) {
        tasksForDate[taskDateString] += 1;
      } else {
        tasksForDate[taskDateString] = 1;
      }
    });

    return tasksForDate;
  }, []);

  console.log(workingDates)
  return (
    <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
      {/*<div
        className={cn(`grid auto-rows-max items-start gap-4 md:gap-8`,
          selectedDay ? 'lg:col-span-2' : 'lg:col-span-3'
        )}
      >
        <Tabs defaultValue="week">
          <TabsContent value="week">
            <Card
              className={'dark:border-zinc-800'}
              x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount.">
              <CardHeader className="px-7">
                <CardTitle>Tasks Calendar</CardTitle>
                <CardDescription>
                          Members of «Nirvana» hotel.
                        </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">
                      {currentDate.toLocaleString("default", {month: "long", year: "numeric"})}
                    </h1>
                    <div className="flex gap-2">
                      <Button onClick={prevMonth} variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4"/>
                      </Button>
                      <Button onClick={nextMonth} variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4"/>
                      </Button>
                    </div>
                  </div>
                  <div className={'flex w-full mb-5'}>
                    {DAYS.map((day) => (
                      <div key={day} className="text-center font-semibold p-2 bg-muted w-full">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="flex-grow grid grid-cols-7 gap-1">
                    {Array.from({length: startingDayIndex}).map((_, index) => (
                      <div key={`empty-${index}`} className="p-2"/>
                    ))}
                    {Array.from({length: daysInMonth}).map((_, index) => {
                      const days = index + 1;
                      const date = new Date(currentDate);
                      date.setDate(days);
                      const hasTasks = Object.keys(workingDates).find(workedDate => workedDate === date.toDateString());
                      return (
                        <div
                          key={days}
                          onClick={() => setSelectedDay(date.toDateString() === selectedDay?.toDateString() ? null : date)}
                          className={cn(
                            `p-2 border border-border flex items-center justify-center dark:hover:bg-gray-800/40 dark:hover:text-white min-h-[100px] select-none`,
                            {
                              'dark:bg-zinc-800/50 text-white': isToday(days),
                            },
                            {
                              'dark:bg-red-800/40 text-white': hasTasks,
                            },
                            {
                              'dark:bg-gray-200 text-black': selectedDay?.toDateString() === date.toDateString(),
                            },
                          )}
                        >
                          <div className={'flex flex-col items-center justify-center'}>
                            <p>{days}</p>
                            {hasTasks && <p className={'text-sm font-semibold'}>{workingDates[date.toDateString()]} Tasks</p>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>*/}
      {/*{(*/}
      <Dialog defaultOpen={true}>
        <DialogTrigger asChild>
          <div className={'flex flex-1 items-center min-w-fit dark:text-white'}>
            <button className={'underline text-sm text-emerald-400'} onClick={() => {}}>
              Mark as completed
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mark as completed</DialogTitle>
            <DialogDescription>
              Indicate the items you used/spent while completing the task. Otherwise press &quot;Skip&quot;
            </DialogDescription>
          </DialogHeader>
          <div>
            <ScrollArea className={'max-h-[30dvh] h-full'}>
            <Table>
              <TableHeader>
                <TableRow
                  className={'dark:hover:bg-transparent'}
                >
                  <TableHead className={'w-1/2'}>Item Name</TableHead>
                  <TableHead className="pl-5 w-full">
                    Amount spent
                  </TableHead>
                  <TableHead>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {[...(new Array(10))].map((_, ind) => (
                    <TableRow
                      key={`lack-${ind}`}
                      className={'dark:hover:bg-transparent'}
                    >
                      <TableCell className={'w-max'}>
                        <div className="font-medium">{'Bucket'}</div>
                      </TableCell>
                      <TableCell className="text-base dark:text-white pl-5">
                        <Input value={'5'}/>
                      </TableCell>
                      <TableCell className={''}>
                        <div className={'flex justify-start'}>
                          <TrashIcon
                            onClick={() => {}}
                            className={`text-red-500 w-5 h-5 cursor-pointer hover:text-red-600 transition`}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            </ScrollArea>
            <div className={'dark:hover:bg-zinc-900 cursor-pointer'}>
              <div className={'py-2'}>
                <div className={'flex justify-center'}>
                  <PlusCircledIcon
                    onClick={() => {}}
                    className={`text-blue-300 h-6 w-6 hover:text-blue-400 transition`}
                  />
                </div>
              </div>
            </div>
          </div>
         {/* <div className="grid gap-4 pb-4">
            <div>
              <h3>Used/Spend Items List</h3>
              <ul className={'mt-2 pl-5'}>
                <li className={'flex text-sm font-normal'}>
                  <span>1.&ensp;</span>
                  <p className={''}>Bucket —&ensp;</p>
                  <p>5</p>
                </li>
              </ul>
            </div>
          </div>*/}
          <DialogFooter className={'flex w-full justify-between'}>
            <Button type="button" variant="outline">Skip</Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedDay &&
        <ListTasks
          selectedDate={selectedDay}
          tasks={tasksData?.data ?? []}
        />
      }
    </div>
  )
}

export default TasksCalendar;