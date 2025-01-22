export const dynamic = 'force-dynamic';

import React from 'react';
import {getQueryClient} from "@lib/query/get-query-client";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import {getAllUsersOption} from "@lib/query/user/queryOptions";
import Dashboard from "@/app/(member)/worker/dashboard/components/Dashboard";
import {USER_ROLES_ENUM} from "@lib/constants";

const Page = async () => {
  const queryClient = getQueryClient();
  /*await queryClient.prefetchQuery(
    getAllUsersOption({ roles: [USER_ROLES_ENUM.Housemaid, USER_ROLES_ENUM.Technician]})
  );*/

  return (
    <div>
      {/*<HydrationBoundary state={dehydrate(queryClient)}>*/}
        <Dashboard/>
      {/*</HydrationBoundary>*/}
    </div>
  );
};

export default Page;