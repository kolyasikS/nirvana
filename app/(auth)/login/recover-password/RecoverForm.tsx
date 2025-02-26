'use client';

import React, {useState} from 'react';
import {Button, Input, Label, Loader} from "@/components/ui";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {toast} from "@/hooks/use-toast";

type Props = {
  code: string;
  email: string;
}
const RecoverForm = ({
  code,
  email
}: Props) => {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const setNewPasswordMutation = useMutation({
    mutationFn: (AuthController.setNewPassword),
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message }) => {
      toast({
        title: message
      });

      router.replace('/login');
    },
  })


  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={'flex gap-3'}>
        <Button variant={'secondary'} className="w-full" onClick={() => router.replace('/login')}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full"
          onClick={() => {
            if (!setNewPasswordMutation.isPending) {
              setNewPasswordMutation.mutate({
                password,
                confirmPassword,
                code,
                email
              })
            }
          }}
        >
          {setNewPasswordMutation.isPending ? <Loader/> : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default RecoverForm;