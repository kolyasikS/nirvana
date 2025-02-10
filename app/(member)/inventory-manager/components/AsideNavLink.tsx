'use client';
import React from 'react';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui";
import Link from "next/link";
import {Home} from "lucide-react";
import {usePathname} from "next/navigation";


type Props = {
  href: string;
  label: string;
  tooltip: string;
  icon: React.ReactNode;
}
const AsideNavLink = ({
  href,
  label,
  tooltip,
  icon
}: Props) => {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-400 dark:hover:text-gray-50${pathname?.includes(`/${href}`) ? ' bg-gray-100 dark:bg-gray-800' : ''}`}
        >
          {icon}
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default AsideNavLink;