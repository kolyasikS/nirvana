import React, {Dispatch, SetStateAction} from 'react';
import {FormInputBox} from "@/components/ui/form-input-box";
import {uppercaseWord} from "@lib/utils";
import {Button} from "@/components/ui";
import {Loader} from "lucide-react";

type Props = {
  form: IUpdateUserDetails;
  setForm: Dispatch<SetStateAction<IUpdateUserDetails>>;
  onSubmit: () => void;
  btnLabel: string;
  isLoading: boolean;
}

const UserProfileForm = ({
  form,
  setForm,
  onSubmit,
  btnLabel,
  isLoading,
}: Props) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4">
        <FormInputBox
          id="name"
          type="name"
          placeholder="John"
          value={form.firstName}
          onChange={(e) => setForm({...form, firstName: e.target.value})}
          label={'First Name'}
        />
        <FormInputBox
          id="last_name"
          type="last_name"
          placeholder="Snow"
          value={form.lastName}
          onChange={(e) => setForm({...form, lastName: e.target.value})}
          label={'Last Name'}
        />
        <FormInputBox
          id="email"
          type="email"
          placeholder="m@example.com"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          label={'Email'}
        />
        <FormInputBox
          id="post"
          type="text"
          placeholder="Manager"
          value={form.role}
          onChange={(e) => setForm({...form, role: e.target.value})}
          label={'Post'}
        />
        <FormInputBox
          id="gender"
          type="gender"
          placeholder="Male"
          value={uppercaseWord(form.sex)}
          onChange={(e) => setForm({...form, sex: e.target.value})}
          label={'Gender'}
        />
      </div>
      <Button type="submit" className="w-full">
        {isLoading ? <Loader/> : btnLabel}
      </Button>
    </form>
  );
};

export default UserProfileForm;