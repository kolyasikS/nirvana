'use client';
import React from 'react';
import {Button} from "@/components/ui";
import {FileIcon} from "@radix-ui/react-icons";
import {CSVLink} from "react-csv";

type Props = {
  data: any;
  label: any;
}
export const ExportButton = ({
  data,
  label
}: Props) => {
  return (
    <CSVLink {...data}>
      <Button
        variant="outline"
        className="gap-1 text-sm"
      >
        <FileIcon className="h-3.5 w-3.5"/>
        {label}
      </Button>
    </CSVLink>
  );
};
