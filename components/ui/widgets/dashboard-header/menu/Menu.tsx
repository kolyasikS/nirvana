'use client';

import React, {useState} from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import {Settings} from "lucide-react";
import Logout from "@/components/ui/widgets/dashboard-header/menu/options/Logout";
import ChangePassword from "@/components/ui/widgets/dashboard-header/menu/options/ChangePassword";

const Menu = () => {
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);

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
        <DropdownMenuItem onClick={() => setChangePasswordModalVisible(true)}>
          Change Password
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ChangePassword
        changePasswordModalVisible={changePasswordModalVisible}
        setChangePasswordModalVisible={setChangePasswordModalVisible}
      />
    </DropdownMenu>
  );
};

export default Menu;