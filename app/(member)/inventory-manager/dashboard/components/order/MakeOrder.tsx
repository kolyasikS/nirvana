'ues client';

import {GET_ALL_ITEMS_QK} from "@lib/query/user/queryKeys";
import {TrashIcon} from "@radix-ui/react-icons";
import {ItemController} from "@/controllers/inventory-manager/Item.controller";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle, Loader,
  Table, TableBody, TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui";
import {getLackingItems} from "@lib/query/inventory-manager/queryOptions";
import QuantityInput from "@/app/(member)/inventory-manager/dashboard/components/order/QuantityInput";
import {GET_LACKING_ITEMS_QK} from "@lib/query/inventory-manager/queryKeys";
import {useToast} from "@/hooks/use-toast";

type Props = {
  onClose: () => void;
}
const MakeOrder = ({
  onClose
}: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: lackingItemsResponse,
    isPending
  } = useQuery(getLackingItems());
  const [order, setOrder] = useState<IOrder>({items: []});
  useEffect(() => {
    setOrder({
      items: lackingItemsResponse?.data.map((item: IItem & { recommendedQuantityToOrder: number }) => ({
        name: item.name,
        quantity: item.recommendedQuantityToOrder,
      }))
    });
  }, [lackingItemsResponse]);

  const onQuantityChange = useCallback((value: number, item: IOrderItem) => {
    setOrder(order => ({
      items: order.items.map((inlineItem: IOrderItem) => item.name === inlineItem.name && !isNaN(value) ? {...inlineItem, quantity: value} : inlineItem),
    }));
  }, []);

  const makeOrderMutation = useMutation({
    mutationFn: (ItemController.makeOrder),
    onMutate: async (order: IOrder) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true });
      await queryClient.cancelQueries({ queryKey: [GET_LACKING_ITEMS_QK], exact: true });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_ITEMS_QK]);

      queryClient.setQueryData<IResponse>([GET_ALL_ITEMS_QK], (oldResponse) =>
        oldResponse?.data
          ? {
            ...oldResponse,
            data: oldResponse.data.map((resItem: IItem) => {
              const orderItem = order.items.find(orderItem => orderItem.name === resItem.name);
              if (orderItem) {
                return {
                  ...resItem,
                  quantity: resItem.quantity + orderItem.quantity
                }
              } else {
                return resItem
              }
            })} as IResponse
          : oldResponse
      );
      return { previousResponse };
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true });
      queryClient.invalidateQueries({ queryKey: [GET_LACKING_ITEMS_QK], exact: true });

      toast({
        title: message
      });
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true });
    }
  })

  const makeOrderHandler = async (e: any) => {
    e.preventDefault();
    makeOrderMutation.mutate(order);
  }

  /*const addEmptyOrderItem = () => {
    setOrder(order => ({
      ...order,
      items: [
        ...order.items,
        {
          id: (new Date()).getTime().toString(),
          name: ``,
          quantity: 0,
        }
      ],
    }));
  }*/

  const removeOrderItem = (toDeleteItemName: string) => {
    setOrder(order => ({
      ...order,
      items: order.items.filter(item => item.name !== toDeleteItemName)
    }));
  }
  return (
    <div className={'grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'}>
      <Card
        className={'dark:border-zinc-800'}
        x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount."
      >
        <CardHeader className="px-7 pb-2">
          <CardTitle className={'text-center text-xl mb-5'}>New Order</CardTitle>
          {!isPending && <CardTitle>Lacking Items</CardTitle>}
          {/*<CardDescription>
            Items of «Nirvana» hotel.
          </CardDescription>*/}
        </CardHeader>
        {
          isPending
            ? <div className="w-full flex justify-center pt-5 pb-10">
              <Loader />
            </div>
            : (
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow
                      className={'dark:hover:bg-transparent'}
                    >
                      <TableHead>Name</TableHead>
                      <TableHead className="pl-5">
                        Quantity to replenish
                      </TableHead>
                      <TableHead>
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order?.items?.length > 0
                      ? (
                        <>
                          {order?.items?.map((item: IOrderItem) => (
                            <TableRow
                              key={`lack-${item.name}`}
                              className={'dark:hover:bg-transparent'}
                            >
                              <TableCell>
                                <div className="font-medium">{item.name}</div>
                              </TableCell>
                              <TableCell className="text-base dark:text-green-400 pl-5">
                                <QuantityInput
                                  onChange={onQuantityChange}
                                  item={item}
                                />
                                {/*<Input
                                className={''}
                                value={item.quantity}
                                onChange={(e) =>
                                  setOrder(order => ({
                                    items: order.items.map((inlineItem: IOrderItem) => item.id === inlineItem.id && !isNaN(+e.target.value) ? {...inlineItem, quantity: +e.target.value} : inlineItem),
                                  }))}
                              />*/}
                              </TableCell>
                              <TableCell className={''}>
                                <div className={'flex justify-start'}>
                                  <TrashIcon
                                    onClick={() => removeOrderItem(item.name)}
                                    className={`text-red-500 w-5 h-5 cursor-pointer hover:text-red-600 transition`}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                          {/*<TableRow className={'dark:hover:bg-zinc-900 cursor-pointer'}>
                            <TableCell className={''} colSpan={3}>
                              <div className={'flex justify-center'}>
                                <PlusCircledIcon
                                  onClick={addEmptyOrderItem}
                                  className={`text-blue-300 h-6 w-6 hover:text-blue-400 transition`}
                                />
                              </div>
                            </TableCell>
                          </TableRow>*/}
                        </>
                      )
                      :  (
                        <TableRow className="dark:hover:bg-transparent">
                          <TableCell className={'col-span-2 row-span-2'} colSpan={2}>
                            <div className="font-medium text-center">No lacking items</div>
                          </TableCell>
                        </TableRow>
                      )
                    }
                  </TableBody>
                </Table>
                <div className={'w-full mt-5 flex justify-between'}>
                  <Button className={'px-10'} onClick={makeOrderHandler} disabled={!order?.items?.length && !makeOrderMutation.isPending}>
                    {makeOrderMutation.isPending ? <Loader/> : 'Make'}
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            )
        }
      </Card>
    </div>
  );
};

export default MakeOrder;