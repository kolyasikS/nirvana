import {getAssignments} from "@lib/query/manager/queryOptions";

export const dynamic = 'force-dynamic';

import {AMOUNT_IN_PAGE} from "@lib/constants";
import React from 'react';
import {getQueryClient} from "@lib/query/get-query-client";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import ItemsHistory from "@/app/(member)/inventory-manager/items-history/components/ItemsHistory";
import {getItemHistories} from "@lib/query/inventory-manager/queryOptions";
import AssignmentsDashboard from "@/app/(member)/manager/assignments/components/AssignmentsDashboard";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAssignments({
    pageNumber: 1,
    pageSize: AMOUNT_IN_PAGE,
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AssignmentsDashboard/>
    </HydrationBoundary>
  );
};

export default Page;