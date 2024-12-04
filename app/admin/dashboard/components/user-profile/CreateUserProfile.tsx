'use client'

import { useState } from 'react'
import UserProfileForm from "@/app/admin/dashboard/components/user-profile/UserProfileForm";

export function CreateUserProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    sex: '',
    role: '',
  });

  const updateUserProfileHandler = () => {} // :REPLACE on mutation
  return (
    <UserProfileForm
      form={form}
      setForm={setForm}
      isLoading={isLoading}
      btnLabel={'Create'}
      onSubmit={updateUserProfileHandler}
    />
  )
}

