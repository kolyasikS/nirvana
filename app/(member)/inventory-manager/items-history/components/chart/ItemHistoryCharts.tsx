'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {AxisOptions, Chart} from "react-charts";
import {
  Loader
} from "@/components/ui";
import {useQuery} from "@tanstack/react-query";
import {getItemHistories} from "@lib/query/inventory-manager/queryOptions";
import FilterChart from "@/app/(member)/inventory-manager/items-history/components/chart/FilterChart";
import itemsHistory from "@/app/(member)/inventory-manager/items-history/components/ItemsHistory";

const ItemHistoryCharts = () => {
  const [chartData, setChartData] = useState<{data: any, maxUsedItemsPerDay: number}>({
    data: [],
    maxUsedItemsPerDay: 0,
  });

  const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth());
  const {
    data: itemsHistoryResponse,
    isFetching,
    isPlaceholderData,
  } = useQuery(getItemHistories({
    month: selectedMonth + 1,
  }));
  // const isFetching = false;
  // const itemsHistoryResponse = {
  //   data: [
  //     {
  //       "value": 3,
  //       "performedAction": "Put",
  //       "dateOfAction": "2025-05-03T15:02:07.295Z",
  //       "item": {
  //         "id": "8da704f4-af4d-4e1a-b151-74f042572600",
  //         "name": "Bedding set",
  //         "itemCategory": null,
  //         "quantity": 7,
  //         "minimumStockQuantity": 10
  //       },
  //       "user": {
  //         "id": "181eae58-202d-4757-86e2-578df1743d6c",
  //         "firstName": "InventoryManager",
  //         "lastName": "InventoryManager",
  //         "sex": "male",
  //         "email": "inventorymanager@localhost.com",
  //         "emailConfirmed": true,
  //         "role": null
  //       }
  //     },
  //     {
  //       "value": -6,
  //       "performedAction": "Take",
  //       "dateOfAction": "2025-05-07T15:06:37.482Z",
  //       "item": {
  //         "id": "8da704f4-af4d-4e1a-b151-74f042572600",
  //         "name": "Bedding set",
  //         "itemCategory": null,
  //         "quantity": 7,
  //         "minimumStockQuantity": 10
  //       },
  //       "user": {
  //         "id": "181eae58-202d-4757-86e2-578df1743d6c",
  //         "firstName": "InventoryManager",
  //         "lastName": "InventoryManager",
  //         "sex": "male",
  //         "email": "inventorymanager@localhost.com",
  //         "emailConfirmed": true,
  //         "role": null
  //       }
  //     }
  //   ]
  // }

  const dateRangePrimaryAxis = useMemo(() => {
    const year = new Date().getFullYear();
    if (chartData.maxUsedItemsPerDay > 0) {
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
    const series: any = [];
    let maxUsedItemsPerDay = 0;

    const itemHistoryForDate: { [key: string]: number } = {};
    console.log(itemsHistoryResponse)
    const uniqueItems: IItem[] = itemsHistoryResponse?.data?.reduce((arr: IItem[], itemHistory: IItemHistory) => {
      if (!arr.find((item: IItem) => item.id === itemHistory.item.id)) {
        return [...arr, itemHistory.item];
      } else {
        return arr;
      }
    }, [] as IItem[]);
    console.log(uniqueItems)
    uniqueItems?.forEach((item: IItem) => {
      const seriesData: { primary: Date; secondary: unknown; }[] = [];

      itemsHistoryResponse?.data?.filter((itemHistory: IItemHistory) => itemHistory.item.id === item.id).forEach((itemHistory: IItemHistory) => {

        const primaryDate = new Date(itemHistory.dateOfAction);
        primaryDate.setUTCHours(0);
        primaryDate.setUTCMinutes(0);
        primaryDate.setUTCSeconds(0);
        primaryDate.setUTCMilliseconds(0);

        seriesData.push({
          primary: primaryDate,
          secondary: Math.abs(itemHistory.value)
        });
        if (Math.abs(itemHistory.value) > maxUsedItemsPerDay) {
          maxUsedItemsPerDay = Math.abs(itemHistory.value);
        }
      })

      series.push({
        label: item.name,
        data: seriesData.sort((a, b) => a.primary > b.primary ? 1 : -1),
      })
    });

    setChartData({
      data: series,
      maxUsedItemsPerDay,
    });
  }, [itemsHistoryResponse?.data, selectedMonth]);

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
        max: chartData.maxUsedItemsPerDay + 1,
        scaleType: 'linear',
      },
    ],
    [chartData.maxUsedItemsPerDay]
  );

  const [{ activeSeriesIndex, activeDatumIndex }, setState] = React.useState({
    activeSeriesIndex: -1,
    activeDatumIndex: -1,
  });

  return (
    <div className={'grid gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 w-full'}>
      <div className={'w-full grid auto-rows-max lg:col-span-3'}>
        <h2 className={'w-full text-white text-center text-2xl mb-3'}>Workload Chart</h2>
        <FilterChart
          setMonth={setSelectedMonth} month={selectedMonth}
        />
        {isFetching
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
                      {series.data?.length > 0
                        ? series.data.map((item: any, ind: number) => (
                          <div key={ind}>
                            <p className={'text-sm'}>{item.primary.toLocaleDateString('en-UK')} — {item.secondary} Tasks</p>
                          </div>
                        ))
                        : <p className={'text-sm text-red-500'}>No Tasks</p>
                      }
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

export default ItemHistoryCharts;