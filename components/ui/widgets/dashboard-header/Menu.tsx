import React from 'react';
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui";
import {Settings} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {toast} from "@/hooks/use-toast";
import {userStore} from "@lib/stores";
import {useRouter} from "next/navigation";

const Menu = () => {
  const router = useRouter();

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
  );
};

export default Menu;