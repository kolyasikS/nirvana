'use client';

import {UpdateAssignment} from "@/app/(member)/manager/assignments/components/UpdateAssignment";
import React from 'react';
import {Button, Card, CardContent, CardHeader, CardTitle} from "@/components/ui";
import {CreateAssignment} from "@/app/(member)/manager/assignments/components/CreateAssignment";
import {useQuery} from "@tanstack/react-query";
import {getAllRoles} from "@lib/query/user/queryOptions";

type Props = {
  selectedAssignment: IAssignment | null;
  close: () => void;
}
const AssignmentCard = ({
  selectedAssignment = null,
  close,
}: Props) => {
  const {
    data: rolesResponse,
  } = useQuery(
    getAllRoles()
  );

  return (
    <div>
      <Card
        className="overflow-hidden dark:border-zinc-800"
        x-chunk="An order details card with details, shipping information, customer information and payment information."
      >
        <CardHeader className="flex flex-row items-start bg-gray-100/50 dark:bg-zinc-800/40 space-y-0 py-4">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {selectedAssignment ? 'Update Assignment' : 'Create Assignment'}
            </CardTitle>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={close}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm bg-background">
          {selectedAssignment
            ? <UpdateAssignment
              assignment={selectedAssignment}
              onClose={close}
              roles={rolesResponse?.data ?? []}
            />
            : <CreateAssignment
              onClose={close}
              roles={rolesResponse?.data ?? []}
            />
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentCard;