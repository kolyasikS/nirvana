import React from 'react';
import {Label} from "@/components/ui/label";
import {InputProps} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

type FormInputBoxProps = {
  label: string;
  labelClassname?: string;
}

const FormTextareaBox = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea"> & FormInputBoxProps>(
  ({ label, labelClassname, ...props }, ref) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={label} className={labelClassname}>{label}</Label>
      <Textarea
        placeholder={props.placeholder}
        id={label}
        {...props}
      />
    </div>
  );
});

FormTextareaBox.displayName = "FormTextareaBox";

export { FormTextareaBox };