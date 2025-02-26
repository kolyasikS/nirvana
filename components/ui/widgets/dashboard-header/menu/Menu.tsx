'use client';

import React from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import {Settings} from "lucide-react";
import Logout from "@/components/ui/widgets/dashboard-header/menu/options/Logout";
import ChangePassword from "@/components/ui/widgets/dashboard-header/menu/options/ChangePassword";

const Menu = () => {
  return (
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
        <Logout/>
        <DropdownMenuSeparator/>
        <ChangePassword/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;