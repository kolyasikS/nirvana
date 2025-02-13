import React from 'react';
import {TooltipProvider} from "@/components/ui";
import {Home, Package} from "lucide-react";
import {headers} from "next/headers";
import AsideNavLink from "@/app/(member)/inventory-manager/components/AsideNavLink";

type Props = {
  children: React.ReactNode;
}
const Layout = async ({
  children,
}: Props) => {
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
      </aside>
        {children}
      </div>
    </TooltipProvider>
  );
};

export default Layout;