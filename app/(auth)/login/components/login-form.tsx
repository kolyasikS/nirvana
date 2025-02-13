import {useState} from "react";
import {AuthController} from "@/controllers/auth/Auth.controller";
import {useToast} from "@/hooks/use-toast";
import {Button, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Loader} from "@/components/ui";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {userStore} from "@lib/stores";
import {USER_ROLES_ENUM} from "@lib/constants";

type LoginFormProps = {
  startForgotPasswordFlow: () => void;
  moveToEmailConfirmation: () => void;
}
export function LoginForm({
  startForgotPasswordFlow,
  moveToEmailConfirmation,
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
      AuthController.getUserDetails()
        .then(({ data, error }: IResponse) => {

          if (!error) {
            userStore.setUser({
              id: data.id,
              role: data.role,
              email: data.email,
            });
          }

          toast({
            title: message
          });
          console.log(data)
          if (!data.emailConfirmed) {
            moveToEmailConfirmation();
          } else {
            switch (data.role) {
              case USER_ROLES_ENUM.Administrator:
                router.push('/admin/dashboard');
                break;
              case USER_ROLES_ENUM.Manager:
                router.push('/manager/dashboard');
                break;

              case USER_ROLES_ENUM.InventoryManager:
                router.push('/inventory-manager/dashboard');
                break;
              case USER_ROLES_ENUM.Housemaid:
              case USER_ROLES_ENUM.Technician:
                router.push('/worker/dashboard');
                break;
              default:
                toast({
                  title: 'Your role is not available',
                  variant: 'destructive',
                });
            }
          }
        })
    },
  })

  const [email, setEmail] = useState('mykola.primachenko@gmail.com'); //kyrylo.hotvianskyi@nure.ua
  const [password, setPassword] = useState('P@ssword1'); // P@ssword1

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
              <button
                className="ml-auto inline-block text-sm underline"
                onClick={() => startForgotPasswordFlow()}
              >
                Forgot your password?
              </button>
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
