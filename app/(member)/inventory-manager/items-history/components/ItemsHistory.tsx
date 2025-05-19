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
} from "@/components/ui";
import {observer} from "mobx-react-lite";
import {useQuery} from "@tanstack/react-query";
import {useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import ItemCard from "@/app/(member)/inventory-manager/dashboard/components/item/ItemCard";
import {DashboardHeader} from "@/components/ui/widgets";
import {getItemHistories, getMostPopularItem} from "@lib/query/inventory-manager/queryOptions";
import {getFormattedTime} from "@lib/utils";
import {TablePagination} from "@/components/ui/features";
import {AMOUNT_IN_PAGE} from "@lib/constants";
import ExportItemsHistoryButton
  from "@/app/(member)/inventory-manager/items-history/components/ExportItemsHistoryButton";
import {cn} from "@lib/utils-client";
import ItemHistoryCharts from "@/app/(member)/inventory-manager/items-history/components/chart/ItemHistoryCharts";

export const Dashboard = observer(() => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: itemsHistoryResponse,
    isFetching,
    isPlaceholderData
  } = useQuery(getItemHistories({
    pagination: {
      pageNumber,
      pageSize: AMOUNT_IN_PAGE,
    }
  }));
  const [showMostUsedItems, setShowMostUsedItems] = useState(false);
  const {
    data: mostPopularItemsResponse,
  } = useQuery(getMostPopularItem());

  const breadcrumbs = useMemo(() => [{
    title: `Inventory Manager Dashboard`,
    route: '',
  }], []);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader breadcrumbs={breadcrumbs}/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-[100px]">
          <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
            <div
              className={`grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3`}>
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
                              Category
                            </TableHead>
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
                              className={cn(
                                showMostUsedItems && mostPopularItemsResponse?.data?.item?.id === itemHistory.item.id && 'bg-blue-100/10'
                              )}
                            >
                              <TableCell>
                                <div className="font-medium">{itemHistory.item.name}</div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <div className="font-medium">{itemHistory.item.itemCategory.name}</div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{itemHistory.value}</div>
                              </TableCell>
                              <TableCell>
                                <div
                                  className="font-medium">{itemHistory.user.firstName} {itemHistory.user.lastName}
                                </div>
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
              <div className={'w-full flex flex-col items-center gap-3'}>
                <h3 className={'w-full text-center text-2xl text-blue-200'}>The Most Used Item</h3>
                <Card
                  className={'dark:border-zinc-800 w-fit'}
                >
                  <Table className={'mb-2 w-fit'}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Amount interactions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow onClick={() => setShowMostUsedItems(!showMostUsedItems)}>
                        <TableCell>
                          <div className="font-medium">{mostPopularItemsResponse?.data?.item.name}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="font-medium">{mostPopularItemsResponse?.data?.item.itemCategory.name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{mostPopularItemsResponse?.data?.interactions}</div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </div>
          </div>
          <ItemHistoryCharts/>
        </main>
      </div>
    </>
  )
})

export default Dashboard;
