'use client';

import * as React from "react"
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Loader,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";
import {observer} from "mobx-react-lite";
import {useQuery} from "@tanstack/react-query";
import {useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import ItemCard from "@/app/(member)/inventory-manager/dashboard/components/item/ItemCard";
import {DashboardHeader} from "@/components/ui/widgets";
import {getItemHistories} from "@lib/query/inventory-manager/queryOptions";
import {getFormattedTime} from "@lib/utils";
import {TablePagination} from "@/components/ui/features";
import {AMOUNT_IN_PAGE} from "@lib/constants";
import ExportItemsButton from "@/app/(member)/inventory-manager/dashboard/components/ExportItemsButton";
import ExportItemsHistoryButton
  from "@/app/(member)/inventory-manager/items-history/components/ExportItemsHistoryButton";

export const Dashboard = observer(() => {
  // const { data: queryUsers } = useSuspenseQuery(getAllUsersOption);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: itemsHistoryResponse,
    isFetching,
    isPlaceholderData
  } = useQuery(getItemHistories({
    pageNumber,
    pageSize: AMOUNT_IN_PAGE,
  }));

  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<null | IItem>(null);

  const selectItem = (item: IItem) => {
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  }

  const breadcrumbs = useMemo(() => [{
    title: `Inventory Manager Dashboard`,
    route: '',
  }], []);

  // const getNewItemsHistoryPage = useCallback((newPageNumber) => {
  //   setPageNumber(newPageNumber);
  //   refetch()
  // }, [refetch]);
  return (
    <>
      {/*<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">*/}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader breadcrumbs={breadcrumbs}/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-[100px]">
          {/*lg:col-span-2*/}
          <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
            <div
              className={`grid auto-rows-max items-start gap-4 md:gap-8 ${selectedItem ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <Tabs defaultValue="week">
                <TabsContent value="week">
                  <div className="flex items-center mb-2">
                    <div className="flex w-full items-center gap-2 justify-end">
                      <ExportItemsHistoryButton itemsHistory={itemsHistoryResponse?.data?.itemHistories ?? []}/>
                    </div>
                  </div>
                  <Card
                    className={'dark:border-zinc-800'}
                    x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount.">
                    <CardHeader className="px-7">
                      <CardTitle>Inventory</CardTitle>
                      <CardDescription>
                        History of item changes.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className={'relative'}>
                      <Table className={'mb-5'}>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item Name</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Item Change Value
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Performer Name
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Performed Action
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Date
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itemsHistoryResponse?.data?.itemHistories?.map((itemHistory: IItemHistory) => (
                            <TableRow
                              key={itemHistory.dateOfAction}
                              // className={`${item.id === selectedItem?.id ? 'bg-gray-100 dark:bg-zinc-800' : ''}`}
                              // onClick={() => selectItem(item)}
                            >
                              <TableCell>
                                <div className="font-medium">{itemHistory.item.name}</div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{itemHistory.value}</div>
                              </TableCell>
                              <TableCell>
                                <div
                                  className="font-medium">{itemHistory.user.firstName} {itemHistory.user.lastName}</div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{itemHistory.performedAction}</div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{getFormattedTime(itemHistory.dateOfAction)}</div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        count={itemsHistoryResponse?.data?.count ?? 0}
                      />
                      {isPlaceholderData && isFetching && (
                        <div
                          className={'absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-[2px]'}>
                          <Loader/>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            {selectedItem && (
              <ItemCard
                selectedItem={selectedItem}
                close={() => {
                  setSelectedItem(null);
                }}
              />
            )}
          </div>
        </main>
      </div>
    </>
  )
})

export default Dashboard;
