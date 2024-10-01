import React, {useState} from 'react';
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, Input,
  Label,
} from "@/components/ui";
import {useToast} from "@/hooks/use-toast";
import {AuthController} from "@/controllers/auth/AuthController";

type ForgotPasswordStepProps = {
  nextStep: () => void;
  previousStep: () => void;
}
const ForgotPasswordStep3 = ({
  nextStep,
  previousStep
}: ForgotPasswordStepProps) => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function recoverPassword() {
    const result = await AuthController.recoverPassword({
      newPassword: password,
      confirmPassword
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

    nextStep();
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between">Forgot password</CardTitle>
        <CardDescription>
          Enter new password. It must contain 8 and more characters and 1 number.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <Button variant={'secondary'} className="w-full" onClick={() => previousStep()}>
              Back
            </Button>
            <Button type="submit" className="w-full" onClick={recoverPassword}>
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default ForgotPasswordStep3;