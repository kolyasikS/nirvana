'use client'

import React, { useState } from 'react'
import {useToast} from "@/hooks/use-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {FormInputBox, Loader} from "@/components/ui";
import {Button} from "@/components/ui";
import {ItemController} from "@/controllers/inventory-manager/Item.controller";
import {GET_LACKING_ITEMS_QK} from "@lib/query/inventory-manager/queryKeys";
import {validateUpdateItemSchema} from "@lib/validation/item-validation";
import {GET_ALL_ITEMS_QK} from "@lib/query/user/queryKeys";

type Props = {
  item: IItem;
  onClose: () => void;
}
export function UpdateItem({
  item,
  onClose,
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState(item);

  const updateItemMutation = useMutation({
    mutationFn: (ItemController.updateItem),
    onMutate: async (updateItemDto: IUpdateItem) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_ITEMS_QK]);

      queryClient.setQueryData<IResponse>([GET_ALL_ITEMS_QK], (oldResponse) =>
        ({
          ...oldResponse,
          data: oldResponse?.data.map((item: IItem) => item.id === updateItemDto.id
            ? {...item, ...updateItemDto}
            : item
          )
        }) as IResponse
      );

      onClose();
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
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true });
    }
  })

  const updateItemHandler = async (e: any) => {
    e.preventDefault();
    if (!updateItemMutation.isPending) {
      const validationResult = await validateUpdateItemSchema(form);
      if (validationResult.error) {
        toast({
          title: validationResult.message,
          variant: 'destructive',
        });
        return;
      }

      updateItemMutation.mutate(form);
    }
  }

  const deleteItemMutation = useMutation({
    mutationFn: (ItemController.deleteItem),
    onMutate: async ({ id: toDeleteItemId }: IDeleteItem) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true });

      const previousResponse = queryClient.getQueryData<IResponse>([GET_ALL_ITEMS_QK]);

      queryClient.setQueryData<IResponse>([GET_ALL_ITEMS_QK], (oldResponse) =>
        oldResponse?.data
          ? {...oldResponse, data: oldResponse.data.filter((oldItem: IItem) => oldItem.id !== toDeleteItemId)} as IResponse
          : oldResponse
      );
      onClose();
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
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true });
    },
  })

  const deleteTaskHandler = async (e: any) => {
    e.preventDefault();
    if (!deleteItemMutation.isPending) {
      deleteItemMutation.mutate({ id: item.id });
    }
  }

  return (
    <form className="space-y-8" onSubmit={updateItemHandler}>
      <div className="grid gap-4">
        <FormInputBox
          id="name"
          placeholder="Bucket"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          label={'Name'}
        />
        <FormInputBox
          id="minimumStockQuantity"
          type="text"
          placeholder="Minimum required amount"
          value={form.minimumStockQuantity}
          onChange={(e) => !isNaN(+e.target.value) ? setForm({...form, minimumStockQuantity: +e.target.value}) : null}
          label={'Minimum Stock Quantity'}
        />
      </div>
      <div className={'flex flex-col gap-5'}>
        <Button
          type={'button'}
          variant={'destructive'}
          className={'w-fit'}
          onClick={deleteTaskHandler}
        >
          Delete
        </Button>
        <Button
          type="submit"
          className="w-full"
        >
          {updateItemMutation.isPending ? <Loader/> : 'Update'}
        </Button>
      </div>
    </form>
  )
}

