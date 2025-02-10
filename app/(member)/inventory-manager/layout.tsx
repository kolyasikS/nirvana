import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui";
import Link from "next/link";
import {Home, Package, Settings} from "lucide-react";
import {headers} from "next/headers";
import AsideNavLink from "@/app/(member)/inventory-manager/components/AsideNavLink";

type Props = {
  children: React.ReactNode;
}
const Layout = async ({
  children,
}: Props) => {
  const url = (await headers()).get('referer');

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-gray-100/40 dark:bg-zinc-800/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex dark:bg-background">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <AsideNavLink
            href={'dashboard'}
            label={'Dashboard'}
            tooltip={'Dashboard'}
            icon={<Home className="h-5 w-5"/>}
          />
          <AsideNavLink
            href={'items-history'}
            label={'Items History'}
            tooltip={'Items History'}
            icon={<Package className="h-5 w-5"/>}
          />
        </nav>
        {/*<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Settings className="h-5 w-5"/>
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>*/}
      </aside>
        {children}
      </div>
    </TooltipProvider>
  );
};

export default Layout;