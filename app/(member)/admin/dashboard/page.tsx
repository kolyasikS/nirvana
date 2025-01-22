export const dynamic = 'force-dynamic';

import React from 'react';
import Dashboard from "@/app/(member)/admin/dashboard/components/Dashboard";
import {getQueryClient} from "@lib/query/get-query-client";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {getAllUsersOption} from "@lib/query/user/queryOptions";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAllUsersOption({}));

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard/>
      </HydrationBoundary>
    </div>
  );
};

export default Page;