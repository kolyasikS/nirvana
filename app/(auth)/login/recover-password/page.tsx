import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui";
import RecoverForm from "@/app/(auth)/login/recover-password/RecoverForm";

type Props = {
  searchParams: Promise<any>,
}
const Page = async ({
  searchParams: searchParamsPromise,
}: Props) => {
  const searchParams = await searchParamsPromise;

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
          code={searchParams.code}
          email={searchParams.email}
        />
      </CardContent>
    </Card>
  );
};

export default Page;