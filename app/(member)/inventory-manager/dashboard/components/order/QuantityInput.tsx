import React, {memo} from 'react';
import {Input} from "@/components/ui";

type Props = {
  item: IOrderItem;
  onChange: (value: number, item: IOrderItem) => void;
}
const QuantityInput = memo(({
  item,
  onChange,
}: Props) => {
  console.log('QuantityInput: ', item.name, ' ', item.quantity);

  return (
    <Input
      className={''}
      value={item.quantity}
      onChange={(e) => {
        onChange(+e.target.value, item);
      }}
    />
  );
});
QuantityInput.displayName = 'QuantityInput';

export default QuantityInput;