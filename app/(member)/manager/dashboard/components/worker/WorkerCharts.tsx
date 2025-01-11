import React, {useMemo} from 'react';
import {AxisOptions, Chart} from "react-charts";
import useChartConfig from "@lib/hooks/useChartsConfig";


const WorkerCharts = () => {
  const { data } = useChartConfig({
    series: 10,
    dataType: "time",
  });
  console.log(data);
  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => new Date(datum.primary as unknown as Date),
    }),
    []
  );

  const secondaryAxes = useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );
  return (
    <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 w-full'}>
      <h2 className={'w-full text-white text-center text-2xl'}>Workload Chart</h2>
      <div className="min-h-[500px]">
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            dark: true,
            primaryCursor: true,
          }}
        />
      </div>
      <div className={'text-white font-normal flex flex-col gap-5'}>
        <p>Axes <span className={'text-blue-300 text-xl'}>X</span> - Date of Task</p>
        <p>Axes <span className={'text-blue-300 text-xl'}>Y</span> - Amount of Tasks</p>
      </div>
    </div>
  );
};

export default WorkerCharts;