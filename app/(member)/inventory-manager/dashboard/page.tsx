export const dynamic = 'force-dynamic';

import {getAllItemsOptions} from "@lib/query/user/queryOptions";
import React from 'react';
import {getQueryClient} from "@lib/query/get-query-client";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import Dashboard from "@/app/(member)/inventory-manager/dashboard/components/Dashboard";
import {AMOUNT_IN_PAGE} from "@lib/constants";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAllItemsOptions({
    pageNumber: 1,
    pageSize: AMOUNT_IN_PAGE,
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard/>
    </HydrationBoundary>
  );
};

export default Page;