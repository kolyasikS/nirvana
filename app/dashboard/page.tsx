import React from 'react';
import Dashboard from "@/app/dashboard/components/dashboard";
import {getQueryClient} from "@lib/tanstack/get-query-client";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {allUsersOption} from "@lib/tanstack/queryOptions";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(allUsersOption);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard/>
      </HydrationBoundary>
    </div>
  );
};

export default Page;