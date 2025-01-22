'use client'

import React, { useState } from 'react'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast";
import {AdminController} from "@/controllers/admin/Admin.controller";
import {FormInputBox} from "@/components/ui/features/form-input-box";
import {uppercaseWord} from "@lib/utils";
import {Button, Loader} from "@/components/ui";
import {validateCreateUserSchema} from "@lib/validation/admin-validation";
import {GET_ALL_USERS_QK} from "@lib/query/user/queryKeys";
import {ItemController} from "@/controllers/inventory-manager/Item.controller";
import {GET_ALL_ITEMS_QK} from "@lib/query/inventory-manager/queryKeys";
import {validateCreateItemSchema} from "@lib/validation/item-validation";

type Props = {
  onClose: () => void;
};

export function CreateItem({
  onClose,
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [form, setForm] = useState<ICreateItem>({
    name: '',
    quantity: '' as any,
    minimumStockQuantity: '' as any,
  });

  const createItemMutation = useMutation({
    mutationFn: (ItemController.createItem),
    onMutate: async (createItemDto: ICreateItem) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true });

      const previousResponse = queryClient.getQueryData<IResponse[]>([GET_ALL_ITEMS_QK]);

      const newItemWithId = {
        ...createItemDto,
        id: createItemDto.name,
      };
      queryClient.setQueryData<IResponse>([GET_ALL_ITEMS_QK], (oldResponse) =>
        oldResponse?.data
          ? {...oldResponse, data: [...oldResponse.data, newItemWithId]} as IResponse
          : {...oldResponse, data: [newItemWithId]} as IResponse
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
      toast({
        title: message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QK], exact: true });
    }
  })

  const createItemHandler = async (e: any) => {
    e.preventDefault();
    if (!createItemMutation.isPending) {
      const validationResult = await validateCreateItemSchema(form);
      if (validationResult.error) {
        toast({
          title: validationResult.message,
          variant: 'destructive',
        });
        return;
      }

      createItemMutation.mutate(form);
    }
  }

  return (
    <form className="space-y-4" onSubmit={createItemHandler}>
      <div className="grid gap-4">
        <FormInputBox
          id="name"
          placeholder="Bucket"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          label={'Name'}
        />
        <FormInputBox
          id="quantity"
          type="text"
          placeholder="Amount is in stock"
          value={form.quantity}
          onChange={(e) => !isNaN(+e.target.value) ? setForm({...form, quantity: +e.target.value}) : null}
          label={'Quantity'}
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
      <Button type="submit" className="w-full">
        {createItemMutation.isPending ? <Loader/> : 'Create'}
      </Button>
    </form>
  )
}

