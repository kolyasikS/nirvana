'use client';
import React, {useMemo, useState} from 'react';
import {Card} from "@/components/ui";
import {LoginForm} from "@/app/(auth)/login/components/login-form";
import {ForgotPasswordForm} from "@/app/(auth)/login/components/forgot-password/forgot-password-form";

enum LOGIN_FORMS {
  LOGIN = 'login',
  FORGOT_PASSWORD = 'forgot-password',
}

const LoginCard = () => {
  const [currentForm, setCurrentForm] = useState<LOGIN_FORMS>(LOGIN_FORMS.LOGIN);

  const form = useMemo(() => {
    switch (currentForm) {
      case LOGIN_FORMS.LOGIN:
        return <LoginForm startForgotPasswordFlow={() => setCurrentForm(LOGIN_FORMS.FORGOT_PASSWORD)}/>;
      case LOGIN_FORMS.FORGOT_PASSWORD:
        return <ForgotPasswordForm startLoginFlow={() => setCurrentForm(LOGIN_FORMS.LOGIN)}/>;
      default:
        return <LoginForm startForgotPasswordFlow={() => setCurrentForm(LOGIN_FORMS.FORGOT_PASSWORD)}/>;
    }
  }, [currentForm])
  return (
    <Card className="mx-auto w-full max-w-sm">
      {form}
    </Card>
  );
};

export default LoginCard;