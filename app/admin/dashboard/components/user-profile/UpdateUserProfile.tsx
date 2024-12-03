'use client'

import { useState } from 'react'
import UserProfileForm from "@/app/admin/dashboard/components/user-profile/UserProfileForm";

type Props = {
  user: IUserDetails;
}
export function UpdateUserProfile({
  user
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState(user);

  const updateUserProfileHandler = () => {} // :REPLACE on mutation
  return (
    <UserProfileForm
      form={form}
      setForm={setForm}
      isLoading={isLoading}
      btnLabel={'Update'}
      onSubmit={updateUserProfileHandler}
    />
  )
}

