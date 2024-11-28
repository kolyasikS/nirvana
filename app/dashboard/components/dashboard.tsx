'use client';

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent, TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Input
} from "@/components/ui";
import {observer} from "mobx-react-lite";
import {useSuspenseQuery} from "@tanstack/react-query";
import {allUsersOption} from "@lib/tanstack/queryOptions";
import {uppercaseWord} from "@lib/utils";
import {useState} from "react";

export const Dashboard = observer(() => {
  const { data: users } = useSuspenseQuery(allUsersOption);
  const [selectedUser, setSelectedUser] = useState<null | IUserDetails>(null);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-gray-100/40 dark:bg-zinc-800/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex dark:bg-background">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 bg-gray-100 dark:bg-gray-800  dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Home className="h-5 w-5"/>
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-900 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-50 dark:hover:text-gray-50"
                >
                  <ShoppingCart className="h-5 w-5"/>
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Package className="h-5 w-5"/>
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Users2 className="h-5 w-5"/>
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-950 md:h-8 md:w-8 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <LineChart className="h-5 w-5"/>
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
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
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header
            className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 ">
            <Sheet>
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
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-white pl-8 md:w-[200px] lg:w-[320px] dark:dark:bg-background"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="/placeholder-user.jpg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
              <Tabs defaultValue="week">
                <div className="flex items-center">
                  {/*<TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>*/}
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5"/>
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuCheckboxItem checked>
                          Fulfilled
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Declined
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Refunded
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <File className="h-3.5 w-3.5"/>
                      <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                  </div>
                </div>
                <TabsContent value="week">
                  <Card
                    className={'dark:border-zinc-800'}
                    x-chunk="A table of recent orders showing the following columns: Customer, Type, Status, Date, and Amount.">
                    <CardHeader className="px-7">
                      <CardTitle>Users</CardTitle>
                      <CardDescription>
                        Members of «Nirvana» hotel.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Post
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Gender
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Email Confirmation Status
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user: IUserDetails) => (
                            <TableRow
                              key={user.id}
                              className={`${user.id === selectedUser?.id ? 'bg-gray-100 dark:bg-zinc-800' : ''}`}
                              onClick={() => setSelectedUser(user)}
                            >
                              <TableCell>
                                <div className="font-medium">{user.firstName}&nbsp;;{user.lastName}</div>
                                <div className="hidden text-sm text-gray-500 md:inline dark:text-gray-400">
                                  {user.email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {''} {/*Here user post will be*/}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="outline">
                                  {uppercaseWord(user.sex)}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {user.emailConfirmed ? 'Confirmed' : 'Pending'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div> {/*lg:col-span-2*/}
            {/*<div>
              <Card
                className="overflow-hidden dark:border-zinc-800"
                x-chunk="An order details card with details, shipping information, customer information and payment information."
              >
                <CardHeader className="flex flex-row items-start bg-gray-100/50 dark:bg-zinc-800/40">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Order Oe31b70H
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Copy className="h-3 w-3"/>
                        <span className="sr-only">Copy Order ID</span>
                      </Button>
                    </CardTitle>
                    <CardDescription>Date: November 23, 2023</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                      <Truck className="h-3.5 w-3.5"/>
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline" className="h-8 w-8">
                          <MoreVertical className="h-3.5 w-3.5"/>
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm bg-background">
                  <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Glimmer Lamps x <span>2</span>
                      </span>
                        <span>$250.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Aqua Filters x <span>1</span>
                      </span>
                        <span>$49.00</span>
                      </li>
                    </ul>
                    <Separator className="my-2"/>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                        <span>$299.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                        <span>$5.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Tax</span>
                        <span>$25.00</span>
                      </li>
                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-gray-500 dark:text-gray-400">Total</span>
                        <span>$329.00</span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4"/>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <div className="font-semibold">Shipping Information</div>
                      <address className="grid gap-0.5 not-italic text-gray-500 dark:text-gray-400">
                        <span>Liam Johnson</span>
                        <span>1234 Main St.</span>
                        <span>Anytown, CA 12345</span>
                      </address>
                    </div>
                    <div className="grid auto-rows-max gap-3">
                      <div className="font-semibold">Billing Information</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Same as shipping address
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4"/>
                  <div className="grid gap-3">
                    <div className="font-semibold">Customer Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-500 dark:text-gray-400">Customer</dt>
                        <dd>Liam Johnson</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-500 dark:text-gray-400">Email</dt>
                        <dd>
                          <a href="mailto:">liam@acme.com</a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-500 dark:text-gray-400">Phone</dt>
                        <dd>
                          <a href="tel:">+1 234 567 890</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className="my-4"/>
                  <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <CreditCard className="h-4 w-4"/>
                          Visa
                        </dt>
                        <dd>**** **** **** 4532</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
                <CardFooter
                  className="flex flex-row items-center border-t bg-gray-100/50 px-6 py-3 dark:bg-zinc-800/40">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                  </div>
                  <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <Button size="icon" variant="outline" className="h-6 w-6">
                          <ChevronLeft className="h-3.5 w-3.5"/>
                          <span className="sr-only">Previous Order</span>
                        </Button>
                      </PaginationItem>
                      <PaginationItem>
                        <Button size="icon" variant="outline" className="h-6 w-6">
                          <ChevronRight className="h-3.5 w-3.5"/>
                          <span className="sr-only">Next Order</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
            </div>*/}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
})

export default Dashboard;
