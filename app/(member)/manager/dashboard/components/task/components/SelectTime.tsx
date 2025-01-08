import React, {memo} from 'react';
import {Label} from "@/components/ui";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type Props = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  time: string[];
  placeholder: string;
}
const SelectTime = memo(({
  label,
  value,
  setValue,
  time,
  placeholder
}: Props) => {
  console.log('SelectTime')
  return (
    <div className="flex-1">
      <Label htmlFor={`${label}-select`}>{label}</Label>
      <Select
        value={value}
        onValueChange={setValue}
      >
        <SelectTrigger id={`${label}-select`}>
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent>
          {time.map(t => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

SelectTime.displayName = 'SelectTime';

export default SelectTime;