import React from 'react';
import {DropdownMenuItem} from "@/components/ui";
import {useMutation} from "@tanstack/react-query";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {toast} from "@/hooks/use-toast";
import {userStore} from "@lib/stores";
import {useRouter} from "next/navigation";

const Logout = () => {
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
    <DropdownMenuItem onClick={logout.mutate as any}>
      Logout
    </DropdownMenuItem>
  );
};

export default Logout;