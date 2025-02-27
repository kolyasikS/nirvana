import React, {useCallback, useMemo, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {ScrollArea} from "@/components/ui/scroll-area";
import {cn} from "@lib/utils-client";
import {
  Button,
  FormInputBox,
  Input, Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui";
import {PlusCircledIcon, TrashIcon} from "@radix-ui/react-icons";
import useDebounceValue from "@/hooks/useDebounceValue";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast";
import {TaskController} from "@/controllers/worker/Task.controller";
import {GET_ALL_WORKER_TASKS_QK} from "@lib/query/worker/queryKeys";
import {validateMarkAsCompletedTaskSchema} from "@lib/validation/task-validation";
import {validateModifyItemSchema} from "@lib/validation/item-validation";
import {ItemController} from "@/controllers/worker/Item.controller";
import {GET_ALL_ITEMS_QK} from "@lib/query/user/queryKeys";
import {getAllItemsOptions} from "@lib/query/user/queryOptions";
import {TablePagination} from "@/components/ui/features";

type IUsedItem = IItem & {
  usedAmount: number;
}
type Props = {
  taskId: string;
  date: Date;
}
const MarkAsCompletedModal = ({
  taskId,
  date
}: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: itemsResponse,
    isFetching,
    isPlaceholderData,
  } = useQuery(getAllItemsOptions({
    pageNumber,
    pageSize: 10,
  }));

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [page, setPage] = useState(0);
  const [usedItems, setUsedItems] = useState<IUsedItem[]>([] as any);
  const [searchValue, setSearchValue, debounceValue] = useDebounceValue({
    debounceDelay: 400
  });
  console.log(itemsResponse?.data)
  const filterItems = useMemo(() => {
    return itemsResponse?.data?.items?.
      filter((item: IItem) =>
        usedItems.every((usedItem: IItem) => usedItem.id !== item.id)
      ).
      filter((item: IItem) =>
        item.name.toLowerCase().includes(debounceValue.toLowerCase())
      );
  }, [itemsResponse, usedItems, debounceValue]);
  const markAsCompletedMutation = useMutation({
    mutationFn: (TaskController.markAsCompleted),
    onMutate: async ({ assignmentToUserId: newTaskId }: IMarkAsCompletedTask) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()] });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()]);

      queryClient.setQueryData<IResponse>([GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()], (oldResponse) =>
        oldResponse?.data
          ? {...oldResponse, data: oldResponse.data.map((oldTask: ITask) => oldTask.id === newTaskId ? ({...oldTask, isCompleted: true}) : oldTask)} as IResponse
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
      queryClient.invalidateQueries({ queryKey: [GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()], exact: true });
      toast({
        title: message
      });

      const modifyItemPromises: any[] = [];
      usedItems.forEach((usedItem) => {
        validateModifyItemSchema({
          itemId: usedItem.id,
          amount: usedItem.usedAmount,
        })
          .then((validationResult) => {
            if (validationResult.error) {
              return;
            }
            modifyItemPromises.push(modifyMutation.mutate({ itemId: usedItem.id, amount: usedItem.usedAmount }));
          });
      })

      Promise.all(modifyItemPromises).finally(() => queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true }));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_WORKER_TASKS_QK, date.getMonth() + 1, date.getFullYear()], exact: true });
    }
  });

  const markAsCompletedTaskHandler = useCallback(async () => {
    if (!markAsCompletedMutation.isPending) {
      const validationResult = await validateMarkAsCompletedTaskSchema({ assignmentToUserId: taskId });
      if (validationResult.error) {
        toast({
          title: validationResult.message,
          variant: 'destructive',
        });
        return;
      }

      markAsCompletedMutation.mutate({ assignmentToUserId: taskId });
    }
  }, [markAsCompletedMutation, taskId, toast]);

  const modifyMutation = useMutation({
    mutationFn: (ItemController.modifyItem),
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={'flex flex-1 items-center min-w-fit dark:text-white'}>
          <button className={'underline text-sm text-emerald-400'} onClick={() => {}}>
            Mark as completed
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {
          page === 0
            ? <>
              <DialogHeader>
                <DialogTitle>Mark as completed</DialogTitle>
                <DialogDescription>
                  Indicate the items you used/spent while completing the task. Otherwise press &quot;Skip&quot;
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className={cn(usedItems.length > 0 && 'max-h-[30dvh] h-full')}>
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
                    {usedItems.map((item, ind) => (
                      <TableRow
                        key={item.id}
                        className={'dark:hover:bg-transparent'}
                      >
                        <TableCell className={'w-max'}>
                          <div className="font-medium">{item.name} - {item.quantity}</div>
                        </TableCell>
                        <TableCell className="text-base dark:text-white pl-5">
                          <Input
                            value={item.usedAmount}
                            onChange={(e) =>
                              !isNaN(+e.target.value) && +e.target.value <= item.quantity
                                ? setUsedItems(usedItems => usedItems.map(usedItem => usedItem.id === item.id ? {...usedItem, usedAmount: +e.target.value} : usedItem))
                                : null
                            }
                          />
                        </TableCell>
                        <TableCell className={''}>
                          <div className={'flex justify-start'}>
                            <TrashIcon
                              onClick={() => setUsedItems(usedItems => usedItems.filter(usedItem => usedItem.id !== item.id))}
                              className={`text-red-500 w-5 h-5 cursor-pointer hover:text-red-600 transition`}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
              <div
                className={'dark:hover:bg-zinc-900 cursor-pointer'}
                onClick={() => setPage(1)}
              >
                <div className={'py-2'}>
                  <div className={'flex justify-center'}>
                    <PlusCircledIcon
                      className={`text-blue-300 h-6 w-6 hover:text-blue-400 transition`}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className={'flex w-full justify-between'}>
                <Button type="button" variant="outline" onClick={markAsCompletedTaskHandler as any}>Skip</Button>
                <Button type="submit" onClick={markAsCompletedTaskHandler as any}>Apply</Button>
              </DialogFooter>
            </>
            : <>
              <DialogHeader>
                <DialogTitle>Mark as completed</DialogTitle>
                <DialogDescription>
                  Add an item to list
                </DialogDescription>
              </DialogHeader>
              <div>
                <FormInputBox
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search..."
                  label={'Item Name'}
                />
                <ScrollArea className={'max-h-[30dvh] h-full mt-3 z-0'}>
                  {filterItems?.map((item: IItem) => (
                    <div
                      key={item.id}
                      onClick={() => setUsedItems((usedItems) => [...usedItems, {...item, usedAmount: 0}])}
                      className={'bg-zinc-900 p-2 rounded-md mb-2 hover:bg-zinc-800 cursor-default'}
                    >
                      {item.name} - {item.quantity}
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <TablePagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                count={itemsResponse?.data?.count ?? 0}
              />
              {isPlaceholderData && isFetching && (
                <div className={'absolute z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-[2px]'}>
                  <Loader/>
                </div>
              )}
              <DialogFooter className={'flex w-full justify-between relative z-10'}>
                <Button type="button" variant="outline" onClick={() => setPage(0)}>Back</Button>
              </DialogFooter>
            </>
        }
      </DialogContent>
    </Dialog>
  );
};

export default MarkAsCompletedModal;