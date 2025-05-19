import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  Button,
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui";
import {Home, LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2} from "lucide-react";
import Link from "next/link";
import Menu from "@/components/ui/widgets/dashboard-header/menu/Menu";

type Props = {
  breadcrumbs: IBreadcrumb[]
}
export const DashboardHeader = ({
  breadcrumbs
}: Props) => {
  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 "
    >
      {/*<Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5"/>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-900 text-lg font-semibold text-gray-50 md:text-base dark:bg-gray-50 dark:text-gray-900"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110"/>
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Home className="h-5 w-5"/>
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-gray-950 dark:text-gray-50"
            >
              <ShoppingCart className="h-5 w-5"/>
              Orders
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Package className="h-5 w-5"/>
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Users2 className="h-5 w-5"/>
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <LineChart className="h-5 w-5"/>
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>*/}
      <div className={'flex justify-between w-full gap-5'}>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb: IBreadcrumb, ind) => (
              <BreadcrumbItem key={ind}>
                <BreadcrumbLink asChild>
                  <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <Menu/>
      </div>
    </header>
  );
};
