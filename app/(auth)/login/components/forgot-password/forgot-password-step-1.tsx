import React, {useState} from 'react';
import {Button, CardContent, CardDescription, CardHeader, CardTitle, Input, Label} from "@/components/ui";
import {useToast} from "@/hooks/use-toast";
import {AuthController} from "@/controllers/auth/AuthController";
import {useForgotPasswordFormContext} from "@/app/(auth)/login/components/forgot-password/forgot-password-form";

const ForgotPasswordStep1 = ({
  nextStep,
  previousStep
}: FlowStepProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const { setFormState } = useForgotPasswordFormContext();

  async function sendRecoverEmail() {
    const result = await AuthController.sendCodeToEmail({
      email,
    });

    if (result.error) {
      toast({
        title: result.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: result.message
      });
    }

    setFormState({
      email
    });

    nextStep();
  }

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
            <Button variant={'secondary'} className="w-full" onClick={() => previousStep()}>
              Back
            </Button>
            <Button type="submit" className="w-full" onClick={sendRecoverEmail}>
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default ForgotPasswordStep1;