'use client';
import React from 'react';
import {Button, Card, CardContent, CardHeader, CardTitle} from "@/components/ui";
import {UpdateUserProfile} from "@/app/(member)/admin/dashboard/components/user-profile/UpdateUserProfile";
import {CreateUserProfile} from "@/app/(member)/admin/dashboard/components/user-profile/CreateUserProfile";

type Props = {
  selectedUser: IUserDetails | null;
  close: () => void;
}
const UserProfileCard = ({
  selectedUser = null,
  close,
}: Props) => {
  return (
    <div>
      <Card
        className="overflow-hidden dark:border-zinc-800"
        x-chunk="An order details card with details, shipping information, customer information and payment information."
      >
        <CardHeader className="flex flex-row items-start bg-gray-100/50 dark:bg-zinc-800/40 space-y-0 py-4">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {selectedUser ? 'Update Profile' : 'Create User Account'}
              {/*<Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3"/>
              <span className="sr-only">Update Profile</span>
            </Button>*/}
            </CardTitle>
            {/*<CardDescription>Date: November 23, 2023</CardDescription>*/}
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={close}>
              Close
            </Button>
            {/*<DropdownMenu>
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
            </DropdownMenu>*/}
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm bg-background">
          {selectedUser
            ? <UpdateUserProfile
              user={selectedUser}
              onClose={close}
            />
            : <CreateUserProfile
              onClose={close}
            />
          }
            {/*<div className="grid gap-3">
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
              </div>*/}
        </CardContent>
        {/*<CardFooter
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
            </CardFooter>*/}
      </Card>
    </div>
  );
};

export default UserProfileCard;