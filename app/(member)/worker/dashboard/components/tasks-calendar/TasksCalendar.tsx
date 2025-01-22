"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent} from "@/components/ui";
import * as React from "react";
import {cn} from "@lib/utils-client";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const TasksCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date());

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

  return (
    <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
      <div
        className={`grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2`}>
        <Tabs defaultValue="week">
          <TabsContent value="week">
            <Card
              className={'dark:border-zinc-800'}
              x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount.">
              <CardHeader className="px-7">
                <CardTitle>Tasks Calendar</CardTitle>
                {/*<CardDescription>
                          Members of «Nirvana» hotel.
                        </CardDescription>*/}
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

                      return (
                        <div
                          key={days}
                          onClick={() => setSelectedDay(date)}
                          className={cn(
                            `p-2 border border-border flex items-center justify-center dark:hover:bg-gray-800/40 dark:hover:text-white min-h-[100px] select-none`,
                            {
                              'dark:bg-zinc-800/50 text-white': isToday(days),
                            },
                            {
                              'dark:bg-red-800/40 text-white': days % 2 === 0,
                            },
                            {
                              'dark:bg-gray-200 text-black': selectedDay.toDateString() === date.toDateString(),
                            },
                          )}
                        >
                          <div className={'flex flex-col items-center justify-center'}>
                            <p>{days}</p>
                            {days % 2 === 0 && <p className={'text-sm font-semibold'}>5 tasks</p>}
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
      </div>
      {/*{(*/}
    </div>
  )
}

export default TasksCalendar;