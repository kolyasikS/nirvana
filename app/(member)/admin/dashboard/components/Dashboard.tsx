'use client';

import * as React from "react"
import Link from "next/link"
import {
  Home,
  LineChart,
  ListFilter,
  Package,
  Package2,
  PanelLeft,
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
  CardTitle, Loader,
} from "@/components/ui";
import {observer} from "mobx-react-lite";
import {useMutation, useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {uppercaseWord} from "@lib/utils";
import {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import UserProfileCard from "@/app/(member)/admin/dashboard/components/user-profile/UpdateProfileCard";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {userStore} from "@lib/stores";
import {getAllUsersOption} from "@lib/query/user/queryOptions";
import {toast} from "@/hooks/use-toast";

export const Dashboard = observer(() => {
  const {
    data: users,
  } = useQuery(
    getAllUsersOption({})
  );
  const router = useRouter()

  const [selectedUser, setSelectedUser] = useState<null | IUserDetails>(null);
  const [isUserCreating, setIsUserCreating] = useState<boolean>(false);

  const showUserProfileCard = !!selectedUser || isUserCreating;

  const logout = useMutation({
    mutationFn: (AuthController.logout),
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message}) => {
      userStore.clearUser();
      toast({
        title: message
      });
      router.push('/login');
    },
  });

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-gray-100/40 dark:bg-zinc-800/40">
        {/*<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex dark:bg-background">
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
        </aside>*/}
        {/*<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">*/}
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-0">
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
            <div className={'flex justify-between w-full gap-5'}>
              <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Settings className="h-5 w-5"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/*<DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator/>*/}
                  <DropdownMenuItem onClick={logout.mutate as any}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            {/*lg:col-span-2*/}
            <div className={`grid auto-rows-max items-start gap-4 md:gap-8 ${showUserProfileCard ? 'lg:col-span-2' : 'lg:col-span-4'}`}>
              <Tabs defaultValue="week">
                {/*<div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
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
                </div>*/}
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
                          {/*{users.map((user: IUserDetails) => (
                            <TableRow
                              key={user.id}
                              className={`${user.id === selectedUser?.id ? 'bg-gray-100 dark:bg-zinc-800' : ''}`}
                              onClick={() => setSelectedUser(user)}
                            >
                              <TableCell>
                                <div className="font-medium">{user.firstName}&nbsp;{user.lastName}</div>
                                <div className="hidden text-sm text-gray-500 md:inline dark:text-gray-400">
                                  {user.email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {user.role}
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
                          ))}*/}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <Button
                  className={'mt-5'}
                  onClick={() => {
                    setIsUserCreating(true);
                    setSelectedUser(null);
                  }}
                >
                  Create New User
                </Button>
              </Tabs>
            </div>
            {showUserProfileCard && (
              <UserProfileCard
                selectedUser={selectedUser}
                close={() => {
                  setSelectedUser(null);
                  setIsUserCreating(false);
                }}
              />
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
})

export default Dashboard;
