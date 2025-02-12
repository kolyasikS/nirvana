'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {AxisOptions, Chart} from "react-charts";
import {TaskController} from "@/controllers/manager/Task.controller";
import {
  Button,
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
  Loader
} from "@/components/ui";
import {ListFilter} from "lucide-react";
import FilterChart from "@/app/(member)/manager/dashboard/components/worker/chart/FilterChart";

type Props = {
  workers: IUserDetails[];
}
const WorkerCharts = ({
  workers,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<{data: any, maxTasksInDay: number}>({
    data: [],
    maxTasksInDay: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState(2)//useState((new Date()).getMonth());
  const dateRangePrimaryAxis = useMemo(() => {
    const year = new Date().getFullYear();
    if (chartData.maxTasksInDay > 0) {
      return {
        min: new Date(`${selectedMonth + 1}.01.${year}`),
        max: new Date(selectedMonth < 11 ? `${selectedMonth + 2}.01.${year}` : `01.01.${year + 1}`),
      }
    } else {
      return {
        min: undefined,
        max: undefined,
      }
    }
  }, [selectedMonth, chartData]);

  useEffect(() => {
    setIsLoading(true);
    const series: any = [];
    let maxTasksInDay = 0;

    const tasksPromises: Promise<[IResponse, string]>[] = [];
    workers.forEach((worker) => {
      tasksPromises.push(TaskController.getAllUserTasks({userEmail: 'adsda'}).then(res => [res, worker.email]));
    })

    Promise.all(tasksPromises)
      .then(responses => {
        responses.forEach(([response, workerEmail]) => {
          if (!response.error && response.data) {
            const tasks = response.data;
            console.log(tasks, workerEmail)
            /*const tasks = [
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
            ];*/
            const seriesData: { primary: Date; secondary: unknown; }[] = [];
            const tasksForDate: { [key: string]: number } = {};
            tasks.forEach((task: ITask) => {
              const taskDate = new Date(task.startTime);
              if (taskDate.getMonth() !== selectedMonth) {
                return;
              }
              const taskDateString = taskDate.toDateString();

              if (tasksForDate[taskDateString]) {
                tasksForDate[taskDateString] += 1;
              } else {
                tasksForDate[taskDateString] = 1;
              }
            });
            console.log(tasksForDate);
            Object.entries(tasksForDate).forEach(([date, amount]) => {
              const primaryDate = new Date(date);
              primaryDate.setUTCHours(0);
              primaryDate.setUTCMinutes(0);
              primaryDate.setUTCSeconds(0);
              primaryDate.setUTCMilliseconds(0);

              seriesData.push({
                primary: primaryDate,
                secondary: amount,
              });
              if (amount > maxTasksInDay) {
                maxTasksInDay = amount;
              }
            });
            series.push({
              label: workerEmail,
              data: seriesData.sort((a, b) => a.primary > b.primary ? 1 : -1),
            })
          }
        })

        setChartData({
          data: series,
          maxTasksInDay,
        });
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [workers, selectedMonth]);

  console.log(chartData, workers, dateRangePrimaryAxis)
  const primaryAxis = React.useMemo<
    AxisOptions<typeof chartData.data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary ? new Date(datum.primary) : new Date(),
      min: dateRangePrimaryAxis.min,
      max: dateRangePrimaryAxis.max,
      scaleType: 'time',
    }),
    [dateRangePrimaryAxis]
  );

  const secondaryAxes = useMemo<
    AxisOptions<typeof chartData.data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        min: 0,
        max: chartData.maxTasksInDay + 1,
        scaleType: 'linear',
      },
    ],
    [chartData.maxTasksInDay]
  );

  const [{ activeSeriesIndex, activeDatumIndex }, setState] = React.useState({
    activeSeriesIndex: -1,
    activeDatumIndex: -1,
  });


  console.log(chartData)
  return (
    <div className={'grid gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 w-full'}>
      <div className={'w-full grid auto-rows-max lg:col-span-3'}>
        <h2 className={'w-full text-white text-center text-2xl mb-3'}>Workload Chart</h2>
        <FilterChart setMonth={setSelectedMonth} month={selectedMonth}/>
        {isLoading
          ? (
            <div className={'min-h-[500px] w-full flex justify-center'}>
              <Loader/>
            </div>
          )
          : (<>
            <div className="min-h-[500px] w-full">
              <Chart
                options={{
                  data: chartData.data,
                  primaryAxis,
                  secondaryAxes,
                  dark: true,
                  getDatumStyle: (datum, status) =>
                    (activeDatumIndex === datum.index &&
                    activeSeriesIndex === datum.seriesIndex
                      ? {
                        opacity: 1,
                        circle: {
                          r: 5,
                        },
                        rectangle: {
                          stroke: "black",
                          strokeWidth: 3,
                        },
                      }
                      : activeDatumIndex === datum.index
                        ? {
                          opacity: 1,
                          circle: {
                            r: 3,
                          },
                          rectangle: {
                            stroke: "black",
                            strokeWidth: 1,
                          },
                        }
                        : datum.seriesIndex === activeSeriesIndex
                          ? {
                            circle: {
                              r: 3,
                            },
                            rectangle: {
                              stroke: "black",
                              strokeWidth: 1,
                            },
                          }
                          : status === "groupFocused"
                            ? {
                              circle: {
                                r: 2,
                              },
                              rectangle: {
                                stroke: "black",
                                strokeWidth: 0,
                              },
                            }
                            : {
                              circle: {
                                r: 2,
                              },
                              rectangle: {
                                stroke: "black",
                                strokeWidth: 0,
                              },
                            }) as any,
                  getSeriesStyle: (series) => {
                    console.log('series', series);
                    return {
                      color: `url(#${series.index % 4})`,
                      opacity:
                        activeSeriesIndex > -1
                          ? series.index === activeSeriesIndex
                            ? 1
                            : 0.3
                          : 1,
                    };
                  },
                  onFocusDatum: (focused) =>
                    setState({
                      activeSeriesIndex: focused ? focused.seriesIndex : -1,
                      activeDatumIndex: focused ? focused.index : -1,
                    }),
                  renderSVG: () => (
                    <defs>
                      <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                        <stop offset="0%" stopColor="#17EAD9"/>
                        <stop offset="100%" stopColor="#6078EA"/>
                      </linearGradient>
                      <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
                        <stop offset="0%" stopColor="#ff8f10"/>
                        <stop offset="100%" stopColor="#ff3434"/>
                      </linearGradient>
                      <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
                        <stop offset="0%" stopColor="#42E695"/>
                        <stop offset="100%" stopColor="#3BB2B8"/>
                      </linearGradient>
                      <linearGradient id="3" x1="0" x2="0" y1="1" y2="0">
                        <stop offset="0%" stopColor="#ffb302"/>
                        <stop offset="100%" stopColor="#ead700"/>
                      </linearGradient>
                    </defs>
                  ),
                }}
              />
            </div>
            <div className={'text-white font-normal flex gap-5 mt-5'}>
              <p>Axes <span className={'text-blue-300 text-xl'}>X</span> - Date of Task</p>
              <p>Axes <span className={'text-blue-300 text-xl'}>Y</span> - Amount of Tasks</p>
            </div>
            <div className={'text-white mt-10'}>
              <h3 className={'text-2xl mb-3 font-semibold'}>Content</h3>
              <div className={'flex flex-col gap-2'}>
                {chartData.data.map((series: any) => (
                  <div key={series.label} className={'pl-5'}>
                    <p className={'font-semibold'}>{series.label}</p>
                    <div className={'pl-5 pt-1'}>
                      {series.data.map((item: any, ind: number) => (
                        <div key={ind}>
                          <p className={'text-sm'}>{item.primary.toLocaleDateString('en-UK')} — {item.secondary} Tasks</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>)
        }
      </div>
    </div>
  );
};

export default WorkerCharts;