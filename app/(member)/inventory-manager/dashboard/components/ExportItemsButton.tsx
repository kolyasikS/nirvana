import React, {useMemo} from 'react';
import {ExportButton} from "@/components/ui/features/export-button";
import {formatExportItemsData} from "@lib/export";

type Props = {
  items: IItem[]
}
const ExportItemsButton = ({
  items
}: Props) => {
  const data = useMemo(() => formatExportItemsData(items), [items]);

  return (
    <ExportButton label={'Export Items'} data={data} />
  );
};

export default ExportItemsButton;