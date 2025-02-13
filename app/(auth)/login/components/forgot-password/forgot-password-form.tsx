import React, {
  useState,
} from "react";
import {useToast} from "@/hooks/use-toast";
import {useMutation} from "@tanstack/react-query";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {Button, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Loader} from "@/components/ui";

type ForgotPasswordFormProps = {
  startLoginFlow: () => void;
}
export function ForgotPasswordForm ({
  startLoginFlow
}: ForgotPasswordFormProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const sendRecoverEmailMutation = useMutation({
    mutationFn: (AuthController.sendCodeToEmail),
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

      startLoginFlow();
    },
  })

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between">Forgot password</CardTitle>
        <CardDescription>
          Enter your email below to receive an email for recovering the password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={'flex gap-3'}>
            <Button variant={'secondary'} className="w-full" onClick={() => startLoginFlow()}>
              Back
            </Button>
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                if (!sendRecoverEmailMutation.isPending) {
                  sendRecoverEmailMutation.mutate({email});
                }
              }}
            >
              {sendRecoverEmailMutation.isPending ? <Loader/> : 'Continue'}
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  )
}
