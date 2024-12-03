import React from 'react';
import {Label} from "@/components/ui/label";
import {Input, InputProps} from "@/components/ui/input";

type FormInputBoxProps = {
  label: string;
}

const FormInputBox = React.forwardRef<HTMLInputElement, InputProps & FormInputBoxProps>(
  ({ label, ...props }, ref) => {

  return (
    <div className="grid gap-2">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        {...props}
      />
    </div>
  );
});

FormInputBox.displayName = "FormInputBox";

export { FormInputBox };