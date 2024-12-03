'use client';
import React from 'react';
import {useSuspenseQuery} from "@tanstack/react-query";
import {getUserOption} from "@lib/query/admin/queryOptions";

type Props = {
  userId: string;
}
const UserProfile = ({ userId }: Props) => {
  const { data: user } = useSuspenseQuery(getUserOption({
    userId
  }));

  return (
    <div>
    </div>
  );
};

export default UserProfile;