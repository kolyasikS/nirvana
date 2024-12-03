import React from 'react';
import Dashboard from "@/app/admin/dashboard/components/Dashboard";
import {getQueryClient} from "@lib/query/get-query-client";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {getAllUsersOption} from "@lib/query/admin/queryOptions";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getAllUsersOption);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard/>
      </HydrationBoundary>
    </div>
  );
};

export default Page;