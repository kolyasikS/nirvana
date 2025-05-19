'use client';

import * as React from "react"
import { Badge } from "@/components/ui/badge"
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
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Loader,
} from "@/components/ui";
import {observer} from "mobx-react-lite";
import {useQuery} from "@tanstack/react-query";
import {useMemo, useState} from "react";
import ItemCard from "@/app/(member)/inventory-manager/dashboard/components/item/ItemCard";
import MakeOrderContainer from "@/app/(member)/inventory-manager/dashboard/components/order/MakeOrderContainer";
import {getAllItemsOptions} from "@lib/query/user/queryOptions";
import {DashboardHeader} from "@/components/ui/widgets";
import {AMOUNT_IN_PAGE} from "@lib/constants";
import {TablePagination} from "@/components/ui/features";
import ExportItemsButton from "@/app/(member)/inventory-manager/dashboard/components/ExportItemsButton";

export const Dashboard = observer(() => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: itemsResponse,
    isFetching,
    isPlaceholderData
  } = useQuery(getAllItemsOptions({
    pageNumber,
    pageSize: AMOUNT_IN_PAGE,
  }));

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

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader breadcrumbs={breadcrumbs}/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-[100px]">
          <div className={'grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'}>
            <div
              className={`grid auto-rows-max items-start gap-4 md:gap-8 ${selectedItem ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <Tabs defaultValue="week">
                <TabsContent value="week">
                  <div className="flex items-center mb-2">
                    <div className="flex w-full items-center gap-2 justify-end">
                      <ExportItemsButton items={itemsResponse?.data?.items ?? []}/>
                    </div>
                  </div>
                  <Card
                    className={'dark:border-zinc-800'}
                    x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount.">
                    <CardHeader className="px-7">
                      <CardTitle>Inventory</CardTitle>
                      <CardDescription>
                        Items of «Nirvana» hotel.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table className={'mb-5'}>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Category
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Quantity
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Minimum Required Quantity
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itemsResponse?.data?.items.map((item: IItem) => (
                            <TableRow
                              key={item.id}
                              className={`${item.id === selectedItem?.id ? 'bg-gray-100 dark:bg-zinc-800' : ''}`}
                              onClick={() => selectItem(item)}
                            >
                              <TableCell>
                                <div className="font-medium">{item.name}</div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                  {item.itemCategory.name}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs"
                                       variant={`${item.quantity < item.minimumStockQuantity ? 'destructive' : 'outline'}`}>
                                  {item.quantity}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="default">
                                  {item.minimumStockQuantity}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        count={itemsResponse?.data?.count ?? 0}
                      />
                      {isPlaceholderData && isFetching && (
                        <div className={'absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-[2px]'}>
                          <Loader/>
                        </div>
                      )}
                      <div className={'w-full flex justify-end'}>
                        <Button
                          className={'mt-1'}
                          onClick={() => {
                            setSelectedItem({
                              id: '',
                              quantity: 0,
                              minimumStockQuantity: 0,
                              name: '',
                              itemCategory: {
                                id: '',
                                name: '',
                              }
                            })
                          }}
                        >
                          + Add
                        </Button>
                      </div>
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
          <MakeOrderContainer/>
        </main>
      </div>
    </>
  )
})

export default Dashboard;
