import React, {useState} from 'react';
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui";
import {useToast} from "@/hooks/use-toast";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {useForgotPasswordFormContext} from "@/app/(auth)/login/components/forgot-password/forgot-password-form";

const ForgotPasswordStep2 = ({
  nextStep,
  previousStep
}: FlowStepProps) => {
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const { formState } = useForgotPasswordFormContext();

  async function verifyCode() {
    console.log(formState)
    const result = await AuthController.verifyCode({
      code,
      email: formState.email,
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
          Enter the <span className={'font-bold underline'}>code</span> from your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <InputOTP
              maxLength={6}
              onChange={code => setCode(code)}
              containerClassName={'mb-3 flex justify-center'}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className={'flex gap-3'}>
            <Button variant={'secondary'} className="w-full" onClick={() => previousStep()}>
              Back
            </Button>
            <Button type="submit" className="w-full" onClick={verifyCode}>
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default ForgotPasswordStep2;