import {useState} from "react";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {useToast} from "@/hooks/use-toast";
import {Button, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Loader} from "@/components/ui";
import Link from "next/link";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {userStore} from "@lib/stores";

type LoginFormProps = {
  startForgotPasswordFlow: () => void;
}
export function LoginForm({
  startForgotPasswordFlow
}: LoginFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (AuthController.login),
    onError: (error) => {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: ({ data, message }) => {
      userStore.setUser({
        id: data.userId,
        role: data.role,
      });

      toast({
        title: message
      });
      router.push('/admin/dashboard');
    },
  })

  const [email, setEmail] = useState('admin@localhost.com');
  const [password, setPassword] = useState('P@ssword1');

  async function submit() {
    if (!loginMutation.isPending) {
      loginMutation.mutate({
        email,
        password
      });
    }
  }
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
                onClick={() => startForgotPasswordFlow()}
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" onClick={submit}>
            {loginMutation.isPending ? <Loader/> : 'Login'}
          </Button>
        </div>
      </CardContent>
    </>
  )
}
