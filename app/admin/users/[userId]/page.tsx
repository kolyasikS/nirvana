import React from 'react';
import {getQueryClient} from "@lib/query/get-query-client";
import {getUserOption} from "@lib/query/admin/queryOptions";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import UserProfile from "@/app/admin/users/[userId]/components/UserProfile";

type PageProps = {
  params: { userId: string };
}
const Page = ({
  params: { userId }
}: PageProps) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getUserOption({
    userId,
  }));
  // const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProfile userId={userId} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;