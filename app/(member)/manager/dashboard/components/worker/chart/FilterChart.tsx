import React, {Dispatch, SetStateAction, useMemo} from 'react';
import {
  Button,
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui";
import {ListFilter} from "lucide-react";
import {MONTHS} from "@lib/constants";

type Props = {
  month: number;
  setMonth: (month: number) => void;
  selectedWorker: IUserDetails | null;
  setSelectedWorker: Dispatch<SetStateAction<IUserDetails | null>>;
  workers: IUserDetails[];
}
const FilterChart = ({
  month,
  setMonth,
  selectedWorker,
  setSelectedWorker,
  workers,
}: Props) => {

  return (
    <div className={'w-full flex justify-center mb-5 gap-5'}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-1 text-sm min-w-40"
          >
            <ListFilter className="h-3.5 w-3.5"/>
            <span className="text-base">
              {selectedWorker
                ? `${selectedWorker?.firstName} ${selectedWorker?.lastName}`
                : 'All Workers'
              }
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuCheckboxItem
            key={'all'}
            checked={!selectedWorker}
            onClick={() => setSelectedWorker(null)}
          >
            All Workers
          </DropdownMenuCheckboxItem>
          {workers.map((worker, ind) => (
            <DropdownMenuCheckboxItem
              key={worker.id}
              checked={selectedWorker?.id === worker.id}
              onClick={() => setSelectedWorker(worker)}
            >
              {worker.firstName} {worker.lastName}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-1 text-sm w-40"
          >
            <ListFilter className="h-3.5 w-3.5"/>
            <span className="text-base">{MONTHS[month]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          {MONTHS.map((monthName, ind) => (
            <DropdownMenuCheckboxItem
              key={monthName}
              checked={month === ind}
              onClick={() => setMonth(ind)}
            >
              {monthName}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterChart;