import {useState} from "react";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {useToast} from "@/hooks/use-toast";
import {Button, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Loader} from "@/components/ui";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

type LoginFormProps = {
  moveBack: () => void;
}
export function EmailConfirmation({
  moveBack,
}: LoginFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const confirmEmailMutation = useMutation({
    mutationFn: (AuthController.confirmEmail),
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
      router.push('/admin/dashboard');
    },
  })

  const [code, setCode] = useState('');

  async function submit() {
    if (!confirmEmailMutation.isPending) {
      confirmEmailMutation.mutate({
        code,
      });
    }
  }
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Email Confirmation</CardTitle>
        <CardDescription>
          Enter the code from your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              type="code"
              placeholder="123456"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" onClick={submit}>
            {confirmEmailMutation.isPending ? <Loader/> : 'Confirm'}
          </Button>
        </div>
      </CardContent>
    </>
  )
}
