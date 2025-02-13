import React, {useMemo} from 'react';
import {ExportButton} from "@/components/ui/features/export-button";
import {formatExportItemsHistoryData} from "@lib/export";

type Props = {
  itemsHistory: IItemHistory[]
}
const ExportItemsHistoryButton = ({
  itemsHistory
}: Props) => {
  const data = useMemo(() => formatExportItemsHistoryData(itemsHistory), [itemsHistory]);

  return (
    <ExportButton label={'Export Items History'} data={data} />
  );
};

export default ExportItemsHistoryButton;