import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui";
import RecoverForm from "@/app/(auth)/login/recover-password/[code]/RecoverForm";

type Props = {
  params: {
    code: string
  },
  searchParams: {
    email: string;
  }
}
const Page = ({
  params: {
    code,
  },
  searchParams: {
    email,
  }
}: Props) => {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between">Recover Password</CardTitle>
        <CardDescription>
          Enter new password. It must contain 8 and more characters and 1 number.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecoverForm
          code={code}
          email={email}
        />
      </CardContent>
    </Card>
  );
};

export default Page;