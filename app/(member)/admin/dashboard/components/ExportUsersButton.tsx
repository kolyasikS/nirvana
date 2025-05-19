'use client';
import React, {useMemo} from 'react';
import {ExportButton} from "@/components/ui/features/export-button";
import {formatExportUsersData} from "@lib/export";

type Props = {
  users: IUserDetails[]
}
const ExportUsersButton = ({
  users
}: Props) => {
  const data = useMemo(() => formatExportUsersData(users), [users]);

  return (
    <ExportButton label={'Export Users'} data={data} />
  );
};

export default ExportUsersButton;