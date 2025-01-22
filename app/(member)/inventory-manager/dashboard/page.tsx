export const dynamic = 'force-dynamic';

import React from 'react';
import {getQueryClient} from "@lib/query/get-query-client";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import Dashboard from "@/app/(member)/inventory-manager/dashboard/components/Dashboard";
import {getAllItemsOptions} from "@lib/query/inventory-manager/queryOptions";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAllItemsOptions());

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard/>
      </HydrationBoundary>
    </div>
  );
};

export default Page;